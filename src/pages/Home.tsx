import { IonGrid, IonRow, IonCol, IonImg, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonItem, IonLabel, IonCardContent } from '@ionic/react';
import React, { useState } from 'react';
import { add, document, create, trash } from 'ionicons/icons';
import { useTask } from '../hooks/useTask';

const Home: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const { tasks, deleteTask } = useTask();

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


       <IonGrid>
        <IonRow>
        {tasks.map((task, index) => (
          <IonCol size="12" key={index}>
            <IonCard>
              <IonItem>
                <IonLabel>{task.title} </IonLabel>
                <IonButtons slot="end">
                  <IonButton onClick={() => deleteTask(task)}>
                    <IonIcon slot="icon-only" color="danger" icon={trash} />
                  </IonButton>
                  <IonButton>
                    <IonIcon slot="icon-only" color="primary" icon={create} />
                  </IonButton>
                </IonButtons>
              </IonItem>

              <IonCardContent>
                {task.description}
              </IonCardContent>

            </IonCard>
          </IonCol>
        ))}
        </IonRow>
      </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Home;
