import { useState, useEffect } from "react";
import { useStorage } from '@ionic/react-hooks/storage';
import { useFilesystem } from '@ionic/react-hooks/filesystem';

const TASK_STORAGE = "tasks";

export function useTask() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { get, set } = useStorage();
    const { deleteFile, getUri, readFile, writeFile } = useFilesystem();

    useEffect(() => {
        const loadSaved = async () => {
            const tasksString = await get('tasks');
            const tasks = (tasksString ? JSON.parse(tasksString) : []) as Task[];
            setTasks(tasks);
        };
        loadSaved();
      }, [get, readFile]);

    const saveTask = async (task: Task) => {
        console.log('EJECUTNAOD TASKS');
        const newTasks = [task, ...tasks];
        setTasks(newTasks);

        set(TASK_STORAGE, JSON.stringify(newTasks.map(p => {
            const taskCopy = { ...p };
            return taskCopy;
        })));

        return task;
    }

    const deleteTask = async (task: Task) => {
        console.log('TASK RECIBIDA', task);
        const tasksString = await get('tasks');
        const tasks = (tasksString ? JSON.parse(tasksString) : []) as Task[];
        console.log('TASKS', tasks);

        let newTasks: Task[] = [];
        tasks.forEach( x => {
            if (x.description !== task.description && x.title !== task.title) {
                newTasks.push(x);
            }
        });

        set(TASK_STORAGE, JSON.stringify(newTasks));
    }

    return {
        tasks,
        saveTask,
        deleteTask
    };
}

export interface Task {
    title: string;
    description: string;
}