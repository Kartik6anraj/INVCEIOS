import React, { useState, useEffect } from "react";
import "./Files.css";
import * as AppGeneral from "../socialcalc/AppGeneral";
import { DATA } from "../app-data.js";
import { Local } from "../storage/LocalStorage";
import {
  IonIcon,
  IonModal,
  IonItem,
  IonButton,
  IonList,
  IonLabel,
} from "@ionic/react";
import { fileTrayFull, list } from "ionicons/icons";

const Files: React.FC<{
  store: Local;
  file: string;
  updateSelectedFile: Function;
  updateBillType: Function;
}> = (props) => {
  const [files, setFiles] = useState(props.store._getAllFiles());
  const [modal, setModal] = useState(null);
  const [listFiles, setListFiles] = useState(false);

  const editFile = (key) => {
    props.store._getFile(key).then((data) => {
      AppGeneral.viewFile(key, decodeURIComponent((data as any).content));
      props.updateSelectedFile(key);
      props.updateBillType((data as any).billType);
    });
    // console.log(JSON.stringify(data));
  };

  const deleteFile = (key) => {
    // event.preventDefault();
    const result = window.confirm(`Do you want to delete the ${key} file?`);
    if (result) {
      // Delete file
      props.store._deleteFile(key);
      props.store._getAllFiles().then((data) => setFiles(data as any));
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

  const temp = async () => {
    const data = await props.store._getAllFiles();
    const fileList = Object.keys(data).map((key) => {
      return (
        <IonItem key={key}>
          <IonLabel>{key}</IonLabel>
          <span>{" " + _formatDate(data[key])}</span>
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

    const ourModal = (
      <IonModal isOpen={listFiles} onDidDismiss={() => setListFiles(false)}>
        <IonList>{fileList}</IonList>
        <IonButton
          expand='block'
          color='secondary'
          onClick={() => {
            setListFiles(false);
          }}
        >
          Back
        </IonButton>
      </IonModal>
    );
    setModal(ourModal);
  };

  useEffect(() => {
    temp();
  }, [listFiles]);

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
      {modal}
    </React.Fragment>
  );
};

export default Files;
