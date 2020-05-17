import React, { useState } from "react";
import {
  IonIcon,
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonModal,
} from "@ionic/react";
import { person } from "ionicons/icons";
import { Cloud } from "../storage/CloudStorage";
import { APP_NAME } from "../app-data.js";

const Login: React.FC = () => {
  const [login, setlLogin] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cloud = new Cloud();

  const doAuth = () => {
    console.log("Loggin in... " + email);
    const data = { email: email, password: password, appname: APP_NAME };
    cloud._auth(data);
  };

  const auth = (loggedIn) => {
    if (loggedIn) {
      console.log("log out..");
      setlLogin(false);
    } else {
      console.log("log in..");
      setlLogin(true);
    }
  };

  const loginForm = () => {
    if (openLoginModal) {
      return (
        <IonModal isOpen={openLoginModal} animated>
          <IonList>
            <IonItem>
              <IonInput
                required
                clearInput
                inputMode='email'
                pattern='email'
                id='email'
                value={email}
                onIonChange={(e) => setEmail(e.detail.value)}
                placeholder='Email..'
              />
            </IonItem>
            <IonItem>
              <IonInput
                required
                clearInput
                pattern='password'
                id='password'
                value={password}
                onIonChange={(e) => setPassword(e.detail.value)}
                placeholder='Password..'
              />
            </IonItem>
            <IonButton
              expand='full'
              className='ion-text-center'
              onClick={() => {
                doAuth();
                setOpenLoginModal(false);
              }}
            >
              Login
            </IonButton>
          </IonList>
        </IonModal>
      );
    } else return null;
  };

  return (
    <React.Fragment>
      <IonButton
        slot='start'
        className='ion-padding-start'
        onClick={() => {
          auth(login);
          if (!login) setOpenLoginModal(true);
        }}
      >
        <IonIcon icon={person} size='large' />
        {login ? "Logout" : "Login"}
      </IonButton>
      {loginForm()}
    </React.Fragment>
  );
};

export default Login;
