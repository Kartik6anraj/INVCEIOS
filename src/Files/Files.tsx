import React, { useState, useEffect } from "react";
import "./Files.css";
import * as AppGeneral from "../socialcalc/AppGeneral";
import { DATA } from "../app-data.js";
import { Local } from "../storage/LocalStorage.js";
import { render } from "react-dom";
import {
  IonIcon,
  IonModal,
  IonItem,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { fileTrayFull, key } from "ionicons/icons";

const Files: React.FC<{
  store: Local;
  file: string;
  updateSelectedFile: Function;
}> = (props) => {
  const store = props.store;
  const [files, setFiles] = useState(store._getAllFiles());
  const [listFiles, setListFiles] = useState(false);

  let fileList;

  const toggleListFiles = () => {
    console.log("list Files toggled");
    setListFiles((prevListFiles) => !prevListFiles);
    console.log("show list files called" + listFiles);
    const files = store._getAllFiles();
    // console.log(JSON.stringify(files));
    fileList = Object.keys(files).map((index) => {
      // console.log(key);
      return (
        <IonItem key={index}>
          <span>{_formatDate(files[index])}</span>
          <IonButton
            color='warning'
            onClick={() => {
              editFile(index);
            }}
          >
            Edit
          </IonButton>
          <IonButton
            color='danger'
            onClick={() => {
              deleteFile(index);
            }}
          >
            Delete
          </IonButton>
        </IonItem>
      );
    });
  };

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
      setFiles(store._getAllFiles());
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

  const showListFiles = () => {};

  return (
    <React.Fragment>
      <IonIcon
        icon={fileTrayFull}
        className='ion-padding-end'
        slot='end'
        size='large'
        onClick={toggleListFiles}
      />
      <IonModal isOpen={listFiles} onDidDismiss={() => setListFiles(false)}>
        {fileList}
      </IonModal>
    </React.Fragment>
  );
};

export default Files;
