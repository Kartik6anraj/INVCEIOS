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
  IonPopover,
} from "@ionic/react";
import {
  person,
  settings,
  saveOutline,
  mail,
  print,
  save,
  fileTrayFull,
  add,
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
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({ open: false, event: undefined });

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
          <IonTitle className='ion-text-left'>Editing : Default</IonTitle>
          <IonIcon
            icon={settings}
            slot='end'
            className='ion-padding-end'
            size='large'
            onClick={(e) => {
              setShowPopover({ open: true, event: e.nativeEvent });
              console.log("Popover clicked");
            }}
          />
          <IonIcon
            icon={fileTrayFull}
            className='ion-padding-end'
            slot='end'
            size='large'
            onClick={() => {
              console.log("List files Clicked");
            }}
          />
          <IonIcon
            icon={add}
            slot='end'
            className='ion-padding-end'
            size='large'
            onClick={() => {
              console.log("New file clicked");
            }}
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
          <IonPopover
            animated
            keyboardClose
            backdropDismiss
            event={showPopover.event}
            isOpen={showPopover.open}
            onDidDismiss={(e) =>
              setShowPopover({ open: false, event: undefined })
            }
          >
            <IonButton expand='full' color='light' className='ion-no-margin'>
              Invoice 1
            </IonButton>
            <IonButton expand='full' color='light' className='ion-no-margin'>
              Invoice 2
            </IonButton>
            <IonButton expand='full' color='light' className='ion-no-margin'>
              Company Invoice 1
            </IonButton>
            <IonButton expand='full' color='light' className='ion-no-margin'>
              Company Invoice 2
            </IonButton>
          </IonPopover>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        Hello
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton
            type='button'
            onClick={() => {
              setShowActionSheet(true);
              console.log("Menu clicked");
            }}
          >
            <IonIcon icon={menu} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonApp>
  );
};

export default App;
