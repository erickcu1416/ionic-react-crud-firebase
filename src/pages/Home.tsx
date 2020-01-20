import { IonModal, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonItem, IonLabel, IonCardContent } from '@ionic/react';
import React, { useState } from 'react';
import { add, document } from 'ionicons/icons';
import { ModalExample } from "../modals/modal-text-container";

const Home: React.FC = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="primary">
          <IonButton onClick={() => setShowModal(true)}>
            <IonIcon slot="icon-only" icon={add} />
          </IonButton>
        </IonButtons>
          <IonTitle>Crud Básico</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding"> 
        <IonCard>
          <IonItem>
            <IonIcon slot="start" color="primary" icon={document} />
            <IonLabel>ion-item in a card, icon left, button right</IonLabel>
            <IonButton fill="outline" slot="end">View</IonButton>
          </IonItem>

          <IonCardContent>
            This is content, without any paragraph or header tags,
            within an ion-cardContent element.
          </IonCardContent>

       </IonCard>

        <IonModal isOpen={showModal}>
          <ModalExample/>>
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
