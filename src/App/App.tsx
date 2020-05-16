import React, { useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonButton,
  IonActionSheet,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import {
  person,
  settings,
  saveOutline,
  mail,
  print,
  save,
  fileTrayFull,
  document,
  menu,
} from "ionicons/icons";
import * as AppGeneral from "../socialcalc/AppGeneral";
import { DATA } from "../app-data.js";

import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
// import "../theme/variables.css";

const App: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showActionSheetInvoiceType, setShowActionSheetInvoicetype] = useState(
    false
  );

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonIcon
            icon={person}
            slot='start'
            className='ion-padding-start'
            size='large'
          />
          <IonTitle className='ion-text-center'>Editing : Default</IonTitle>
          <IonIcon
            icon={menu}
            slot='end'
            className='ion-padding-end'
            size='large'
            onClick={() => setShowActionSheet(true)}
          />
          <IonActionSheet
            animated
            keyboardClose
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
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
                text: "List Files",
                icon: fileTrayFull,
                handler: () => {
                  console.log("List Files clicked");
                },
              },
              {
                text: "Change Invoice Type",
                icon: settings,
                handler: () => {
                  setShowActionSheetInvoicetype(true);
                  console.log("Change Invoice Type clicked");
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
          <IonActionSheet
            animated
            keyboardClose
            isOpen={showActionSheetInvoiceType}
            onDidDismiss={() => setShowActionSheetInvoicetype(false)}
            buttons={[
              {
                text: "Invoice 1",
                handler: () => {
                  console.log("Invoice 1 clicked");
                },
              },
              {
                text: "Invoice 2",
                handler: () => {
                  console.log("Invoice 2 clicked");
                },
              },
              {
                text: "Company Invoice 1",
                handler: () => {
                  console.log("Company Invoice 1 clicked");
                },
              },
              {
                text: "Company Invoice 2",
                handler: () => {
                  console.log("Company Invoice 2 clicked");
                },
              },
            ]}
          ></IonActionSheet>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        Hello
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton
            type='button'
            onClick={() => {
              console.log("New file clicked");
            }}
          >
            <IonIcon icon={document} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonApp>
  );
};

export default App;
