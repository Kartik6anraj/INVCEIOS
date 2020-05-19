import React, { useState } from "react";
import * as AppGeneral from "../socialcalc/AppGeneral";
import { DATA } from "../app-data.js";
import { File, Local } from "../storage/LocalStorage.js";
import AWS from "aws-sdk";

import { IonActionSheet, IonAlert, IonicSafeString } from "@ionic/react";
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
  bT: number;
}> = (props) => {
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showAlert4, setShowAlert4] = useState(false);
  const [showAlert5, setShowAlert5] = useState(false);

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

  const getCurrentFileName = () => {
    return props.file;
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
      setShowAlert1(true);
      return;
    }
    const content = encodeURIComponent(AppGeneral.getSpreadsheetContent());
    const data = props.store._getFile(props.file);
    const file = new File(
      data.created,
      new Date().toString(),
      content,
      props.file,
      props.bT
    );
    props.store._saveFile(file);
    props.updateSelectedFile(props.file);
    setShowAlert2(true);
  };

  const doSaveAs = (filename) => {
    // event.preventDefault();
    if (filename) {
      if (_validateName(filename)) {
        // filename valid . go on save
        const content = encodeURIComponent(AppGeneral.getSpreadsheetContent());
        // console.log(content);
        const file = new File(
          new Date().toString(),
          new Date().toString(),
          content,
          filename,
          props.bT
        );
        // const data = { created: file.created, modified: file.modified, content: file.content, password: file.password };
        // console.log(JSON.stringify(data));
        props.store._saveFile(file);
        props.updateSelectedFile(filename);
        setShowAlert4(true);
      } else {
        setShowAlert5(true);
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
    <React.Fragment>
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
              setShowAlert3(true);
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
      />
      <IonAlert
        animated
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        header='Alert Message'
        message={
          "Cannot update <strong>" + getCurrentFileName() + "</strong> file!"
        }
        buttons={["Ok"]}
      />
      <IonAlert
        animated
        isOpen={showAlert2}
        onDidDismiss={() => setShowAlert2(false)}
        header='Save'
        message={
          "File <strong>" +
          getCurrentFileName() +
          "</strong> updated successfully"
        }
        buttons={["Ok"]}
      />
      <IonAlert
        animated
        isOpen={showAlert3}
        onDidDismiss={() => setShowAlert3(false)}
        header='Save As'
        inputs={[
          { name: "filename", type: "text", placeholder: "Enter filename" },
        ]}
        buttons={[
          {
            text: "Ok",
            handler: (alertData) => {
              doSaveAs(alertData.filename);
            },
          },
        ]}
      />
      <IonAlert
        animated
        isOpen={showAlert4}
        onDidDismiss={() => setShowAlert4(false)}
        header='Save As'
        message={
          "File <strong>" +
          getCurrentFileName() +
          "</strong> saved successfully"
        }
        buttons={["Ok"]}
      />
      <IonAlert
        animated
        isOpen={showAlert5}
        onDidDismiss={() => {
          setShowAlert5(false);
          setShowAlert3(true);
        }}
        header='Alert Message'
        message={"Invalid filename!"}
        buttons={["Ok"]}
      />
    </React.Fragment>
  );
};

export default Menu;
