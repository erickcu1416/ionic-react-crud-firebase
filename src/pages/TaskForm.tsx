import React, { useState } from 'react';
import { camera, checkmark } from 'ionicons/icons';
import { IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonInput, IonRow, 
        IonCol, IonImg, IonActionSheet, IonList, IonItem, IonLabel, IonButtons } from '@ionic/react';
import { useTask, Task } from '../hooks/useTask';
const TaskForm: React.FC = () => {

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const { saveTask } = useTask();

  const changeTitle = (title: any) => {
    setTitle(title.detail.value);
  }

  const changeDescription = (description: any) => {
    setDescription(description.detail.value)
  }

  const sendTask = () => {
    console.log('title', title);
    console.log('description', description);
    const task: Task = {
      title,
      description
    }
    saveTask(task);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonTitle>Add Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput value={title} onIonChange={changeTitle}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonInput value={description} onIonChange={changeDescription}></IonInput>
        </IonItem>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={sendTask}>
            <IonIcon icon={checkmark}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TaskForm;