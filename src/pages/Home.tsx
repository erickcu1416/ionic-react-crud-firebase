import { IonGrid, IonRow, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonItem, IonLabel, IonCardContent } from '@ionic/react';
import React from 'react';
import { add, refresh, create, trash } from 'ionicons/icons';
import { useTask, Task } from '../hooks/useTask';
import { RouteComponentProps } from 'react-router';

interface TaskProps extends RouteComponentProps {}

const Home: React.FC<TaskProps> = ({history}) => {

  let { tasks, deleteTask } = useTask();

  const reload = () => {
    window.location.reload();
  }

  const editTask = (task: Task) => {
    history.push('/taskEdit/' + task.id);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="primary">
          <IonButton onClick={reload}>
            <IonIcon slot="icon-only" icon={refresh} />
          </IonButton>
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
                <IonLabel> {task.id} </IonLabel>
                <IonButtons slot="end">
                  <IonButton onClick={() => deleteTask(task)}>
                    <IonIcon slot="icon-only" color="danger" icon={trash} />
                  </IonButton>
                  <IonButton onClick={() => editTask(task)}>
                    <IonIcon slot="icon-only" color="primary" icon={create} />
                  </IonButton>
                </IonButtons>
              </IonItem>

              <IonCardContent>
                <b> {task.title} </b>
                <br/>
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
