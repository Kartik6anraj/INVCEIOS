import React, { useState, useEffect } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
  IonFab,
  IonFabButton,
  IonPopover,
} from "@ionic/react";
import { settings, menu } from "ionicons/icons";

import * as AppGeneral from "../socialcalc/AppGeneral";
import { DATA } from "../app-data.js";

import Menu from "../Menu/Menu";

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
import Files from "../Files/Files";
import NewFile from "../NewFile/NewFile";
import { Local } from "../storage/LocalStorage";
import Login from "../Login/Login";

/* Theme variables */
// import "../theme/variables.css";

const App: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({ open: false, event: undefined });
  const [selectedFile, updateSelectedFile] = useState("default");
  const [device] = useState(AppGeneral.getDeviceType());

  const store = new Local();

  const closeMenu = () => {
    setShowMenu(false);
  };

  const activateFooter = (footer) => {
    AppGeneral.activateFooterButton(footer);
  };

  useEffect(() => {
    const data = DATA["home"][device]["msc"];
    AppGeneral.initializeApp(JSON.stringify(data));
  }, []);

  const footers = DATA["home"][device]["footers"];
  const footersList = footers.map((footerArray) => {
    return (
      <IonButton
        key={footerArray.index}
        expand='full'
        color='light'
        className='ion-no-margin'
        onClick={() => {
          activateFooter(footerArray.index);
          setShowPopover({ open: false, event: undefined });
        }}
      >
        {footerArray.name}
      </IonButton>
    );
  });

  return (
    <IonApp>
      {/*
      <IonHeader>
        <IonToolbar color='primary'>
          <Login />
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

          <Files
            store={store}
            file={selectedFile}
            updateSelectedFile={updateSelectedFile}
          />

          <NewFile
            file={selectedFile}
            updateSelectedFile={updateSelectedFile}
            store={store}
          />

          <IonPopover
            animated
            keyboardClose
            backdropDismiss
            event={showPopover.event}
            isOpen={showPopover.open}
            onDidDismiss={() =>
              setShowPopover({ open: false, event: undefined })
            }
          >
            {footersList}
          </IonPopover>
        </IonToolbar>
      </IonHeader>
      
      <IonToolbar color='secondary'>
        <IonTitle className='ion-text-center'>
          Editing : {selectedFile}
        </IonTitle>
      </IonToolbar>
      */}
      <IonContent>
        <IonHeader>
          <IonToolbar color='primary'>
            <Login />
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

            <Files
              store={store}
              file={selectedFile}
              updateSelectedFile={updateSelectedFile}
            />

            <NewFile
              file={selectedFile}
              updateSelectedFile={updateSelectedFile}
              store={store}
            />

            <IonPopover
              animated
              keyboardClose
              backdropDismiss
              event={showPopover.event}
              isOpen={showPopover.open}
              onDidDismiss={() =>
                setShowPopover({ open: false, event: undefined })
              }
            >
              {footersList}
            </IonPopover>
          </IonToolbar>
        </IonHeader>

        <IonToolbar color='secondary'>
          <IonTitle className='ion-text-center'>
            Editing : {selectedFile}
          </IonTitle>
        </IonToolbar>

        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton type='button' onClick={() => setShowMenu(true)}>
            <IonIcon icon={menu} />
          </IonFabButton>
        </IonFab>
        <Menu
          showM={showMenu}
          setM={closeMenu}
          file={selectedFile}
          updateSelectedFile={updateSelectedFile}
          store={store}
        />
        <div id='workbookControl'></div>
        <div id='tableeditor'>editor goes here</div>
        <div id='msg'></div>
      </IonContent>
    </IonApp>
  );
};

export default App;
