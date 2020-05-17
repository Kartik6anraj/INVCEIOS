import React from "react";
import * as AppGeneral from "../socialcalc/AppGeneral";
import { File, Local } from "../storage/LocalStorage.js";
import { DATA } from "../app-data.js";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

const NewFile: React.FC<{
  file: string;
  updateSelectedFile: Function;
  store: Local;
}> = (props) => {
  const newFile = () => {
    if (props.file !== "default") {
      const content = encodeURIComponent(AppGeneral.getSpreadsheetContent());
      const data = this.store._getFile(props.file);
      const file = new File(
        data.created,
        new Date().toString(),
        content,
        props.file
      );
      props.store._saveFile(file);
      props.updateSelectedFile(props.file);
    }
    const msc = DATA["home"][AppGeneral.getDeviceType()]["msc"];
    AppGeneral.viewFile("default", JSON.stringify(msc));
    props.updateSelectedFile("default");
  };

  return (
    <IonIcon
      icon={add}
      slot='end'
      className='ion-padding-end'
      size='large'
      onClick={() => {
        newFile();
        console.log("New file clicked");
      }}
    />
  );
};

export default NewFile;
