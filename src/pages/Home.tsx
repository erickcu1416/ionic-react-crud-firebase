import { IonGrid, IonRow, IonCol, IonImg, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonItem, IonLabel, IonCardContent } from '@ionic/react';
import React, { useState } from 'react';
import { add, document } from 'ionicons/icons';
import { useTask } from '../hooks/useTask';

const Home: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const { tasks } = useTask();


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="primary">
          <IonButton routerLink="taskForm">
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

       <IonGrid>
        <IonRow>
        {tasks.map((task, index) => (
          <IonCol size="6" key={index}>
            {task.description}
          </IonCol>
        ))}
        </IonRow>
      </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Home;
