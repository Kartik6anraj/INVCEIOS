import React, { useState, useEffect } from "react";
import "./Files.css";
import * as AppGeneral from "../socialcalc/AppGeneral";
import { DATA } from "../app-data.js";
import { Local } from "../storage/LocalStorage.js";
import {
  IonIcon,
  IonModal,
  IonItem,
  IonButton,
  IonList,
  IonLabel,
} from "@ionic/react";
import { fileTrayFull, key } from "ionicons/icons";

const Files: React.FC<{
  store: Local;
  file: string;
  updateSelectedFile: Function;
}> = (props) => {
  const [files, setFiles] = useState(props.store._getAllFiles());
  const [listFiles, setListFiles] = useState(false);

  const editFile = (key) => {
    const data = props.store._getFile(key);
    // console.log(JSON.stringify(data));
    AppGeneral.viewFile(key, decodeURIComponent(data.content));
    props.updateSelectedFile(key);
  };

  const deleteFile = (key) => {
    // event.preventDefault();
    const result = window.confirm(`Do you want to delete the ${key} file?`);
    if (result) {
      // Delete file
      props.store._deleteFile(key);
      setFiles(props.store._getAllFiles());
      loadDefault();
    }
  };

  const loadDefault = () => {
    const msc = DATA["home"][AppGeneral.getDeviceType()]["msc"];
    AppGeneral.viewFile("default", JSON.stringify(msc));
    props.updateSelectedFile("default");
  };

  const _formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const listModal = () => {
    const files = props.store._getAllFiles();
    // console.log(JSON.stringify(files));
    const fileList = Object.keys(files).map((key) => {
      // console.log(key);
      return (
        <IonItem key={key}>
          <IonLabel>{key}</IonLabel>
          <span>{" " + _formatDate(files[key])}</span>
          <IonButton
            slot='end'
            color='warning'
            onClick={() => {
              setListFiles(false);
              editFile(key);
            }}
          >
            Edit
          </IonButton>
          <IonButton
            slot='end'
            color='danger'
            onClick={() => {
              setListFiles(false);
              deleteFile(key);
            }}
          >
            Delete
          </IonButton>
        </IonItem>
      );
    });
    if (setListFiles) {
      return (
        <IonModal isOpen={listFiles} onDidDismiss={() => setListFiles(false)}>
          <IonList> {fileList} </IonList>
        </IonModal>
      );
    } else return null;
  };

  return (
    <React.Fragment>
      <IonIcon
        icon={fileTrayFull}
        className='ion-padding-end'
        slot='end'
        size='large'
        onClick={() => {
          setListFiles(true);
        }}
      />
      {listModal()}
    </React.Fragment>
  );
};

export default Files;
