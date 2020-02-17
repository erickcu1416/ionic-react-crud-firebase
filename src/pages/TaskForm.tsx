import React, { useState } from 'react';
import { checkmark } from 'ionicons/icons';
import { IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonLabel, IonButtons } from '@ionic/react';
import { useTask, Task } from '../hooks/useTask';
import { RouteComponentProps } from 'react-router';
import {
  useIonViewWillEnter,
} from '@ionic/react';

interface TaskProps extends RouteComponentProps <{
  id: any;
}> {}

const TaskForm: React.FC<TaskProps> = ({history, match}) => {
  
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const { saveTask, getTaskById, editTask } = useTask();
  let task;
  let id = '';
  
  useIonViewWillEnter(async () => {
    if (match.params.id) {
      id = match.params.id
      task = await getTaskById(Number(id));
      setTitle(task?.title || '');
      setDescription(task?.description || '');
    }
  });


  const changeTitle = (title: any) => {
    setTitle(title.detail.value);
  }

  const changeDescription = (description: any) => {
    setDescription(description.detail.value)
  }

  const sendTask = async () => {

    let resp: any;
    if (match.params.id) {
      const task: Task = {
        id: Number(match.params.id),
        title,
        description
      }
      resp = await editTask(task);
      
    } else {
      const task: Task = {
        id: Date.now(),
        title,
        description
      }
      resp = await saveTask(task);

    }
    if (resp.title) {
      history.push('/home');
      window.location.reload();
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonTitle> { match.params.id ? 'Edit Task' : 'Add Task' } </IonTitle>
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