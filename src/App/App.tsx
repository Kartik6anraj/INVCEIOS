import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
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
  useIonViewWillEnter,
} from "@ionic/react";
import { person, settings, fileTrayFull, add, menu } from "ionicons/icons";

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
  const [listFiles, setListFiles] = useState(false);

  const usePrevious = <T extends {}>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevListFiles = usePrevious(listFiles);
  const toggleListFiles = () => {
    console.log("list Files toggled");
    setListFiles(!prevListFiles);
  };

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
  const footersList = footers.map((footerArray, i) => {
    return (
      <IonButton
        key={footerArray.index}
        expand='full'
        color='light'
        className='ion-no-margin'
        onClick={() => activateFooter(footerArray.index)}
      >
        {footerArray.name}
      </IonButton>
    );
  });

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
          <IonTitle className='ion-text-left'>
            Editing : {selectedFile}
          </IonTitle>
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
            onClick={toggleListFiles}
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
            {footersList}
          </IonPopover>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
        />
        <div id='workbookControl'></div>
        <div id='tableeditor'>editor goes here</div>
        <div id='msg'></div>
        {listFiles ? (
          <div className='App-files'>
            <Files
              file={selectedFile}
              updateSelectedFile={updateSelectedFile}
            />
          </div>
        ) : null}
      </IonContent>
    </IonApp>
  );
};

export default App;
