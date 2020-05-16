import React from "react";
import { IonActionSheet } from "@ionic/react";
import { saveOutline, save, mail, print } from "ionicons/icons";

const Menu: React.FC<{
  showM: boolean;
  setM: Function;
  file: string;
  updateSelectedFile: Function;
}> = (props) => {
  return (
    <IonActionSheet
      animated
      keyboardClose
      isOpen={props.showM}
      onDidDismiss={() => props.setM()}
      buttons={[
        {
          text: "Save",
          icon: saveOutline,
          handler: () => {
            console.log("Save clicked");
          },
        },
        {
          text: "Save As",
          icon: save,
          handler: () => {
            console.log("Save As clicked");
          },
        },
        {
          text: "Print",
          icon: print,
          handler: () => {
            console.log("Print clicked");
          },
        },
        {
          text: "Email",
          icon: mail,
          handler: () => {
            console.log("Email clicked");
          },
        },
      ]}
    ></IonActionSheet>
  );
};

export default Menu;
