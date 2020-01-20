import React from 'react';
import { IonContent, IonItem, IonLabel, IonInput } from '@ionic/react';

export const ModalExample: React.FC = () => {
  return (
    <IonContent>
        <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput></IonInput>
        </IonItem>

        <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonInput></IonInput>
        </IonItem>
    </IonContent>
  );
};