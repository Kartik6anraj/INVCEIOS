import React, { useState } from "react";
import * as AppGeneral from "../socialcalc/AppGeneral";
import { DATA } from "../app-data.js";
import { File, Local } from "../storage/LocalStorage.js";
import AWS from "aws-sdk";

import { IonActionSheet } from "@ionic/react";
import { saveOutline, save, mail, print } from "ionicons/icons";

const ses = new AWS.SES({
  apiVersion: "2010-12-01",
  accessKeyId: "AKIAIUAT6PWCBX54OQEA",
  secretAccessKey: "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",
  region: "us-west-1",
});

const Menu: React.FC<{
  showM: boolean;
  setM: Function;
  file: string;
  updateSelectedFile: Function;
  store: Local;
}> = (props) => {
  /* Utility functions */
  const _validateName = (filename) => {
    filename = filename.trim();
    if (filename === "default" || filename === "Untitled") {
      // return 'Cannot update default file!';
      return false;
    } else if (filename === "" || !filename) {
      // this.showToast('Filename cannot be empty');
      return false;
    } else if (filename.length > 30) {
      // this.showToast('Filename too long');
      return false;
    } else if (/^[a-zA-Z0-9- ]*$/.test(filename) === false) {
      // this.showToast('Special Characters cannot be used');
      return false;
    }
    return true;
  };

  const _formatString = (filename) => {
    /* Remove whitespaces */
    while (filename.indexOf(" ") !== -1) {
      filename = filename.replace(" ", "");
    }
    return filename;
  };

  const doPrint = () => {
    const content = AppGeneral.getCurrentHTMLContent();
    var printWindow = window.open("", "", "left=100,top=100");
    printWindow.document.write(content);
    printWindow.print();
  };

  const doSave = () => {
    if (props.file === "default") {
      window.alert(`Cannot update ${props.file} file! `);
      return;
    }
    const content = encodeURIComponent(AppGeneral.getSpreadsheetContent());
    const data = props.store._getFile(props.file);
    const file = new File(
      data.created,
      new Date().toString(),
      content,
      props.file
    );
    props.store._saveFile(file);
    props.updateSelectedFile(props.file);
    window.alert(`File ${props.file} updated successfully! `);
  };

  const doSaveAs = () => {
    // event.preventDefault();
    const filename = window.prompt("Enter filename : ");
    if (filename) {
      if (_validateName(filename)) {
        // filename valid . go on save
        const content = encodeURIComponent(AppGeneral.getSpreadsheetContent());
        // console.log(content);
        const file = new File(
          new Date().toString(),
          new Date().toString(),
          content,
          filename
        );
        // const data = { created: file.created, modified: file.modified, content: file.content, password: file.password };
        // console.log(JSON.stringify(data));
        props.store._saveFile(file);
        props.updateSelectedFile(filename);
        window.alert(`File ${filename} saved successfully! `);
      } else {
        window.alert(`Filename cannot be ${props.file}`);
      }
    }
  };

  const sendEmail = () => {
    // Prepare values to send with email
    const emailParams = {
      Destination: { ToAddresses: ["<aspiringuserapps@gmail.com>"] },
      Message: {
        Body: {
          Text: {
            Data: "This is a test email",
          },
        },
        Subject: { Data: "Contact Form" },
      },
      ReplyToAddresses: [""],
      Source: "<aspiring.investments@gmail.com>", // this has to be verified email in SES
    };

    ses.sendEmail(emailParams, function (error, data) {
      if (error) {
        // handle error
      } else {
        // handle success
        alert("Done");
      }
    });
  };

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
            doSave();
            console.log("Save clicked");
          },
        },
        {
          text: "Save As",
          icon: save,
          handler: () => {
            doSaveAs();
            console.log("Save As clicked");
          },
        },
        {
          text: "Print",
          icon: print,
          handler: () => {
            doPrint();
            console.log("Print clicked");
          },
        },
        {
          text: "Email",
          icon: mail,
          handler: () => {
            sendEmail();
            console.log("Email clicked");
          },
        },
      ]}
    ></IonActionSheet>
  );
};

export default Menu;
