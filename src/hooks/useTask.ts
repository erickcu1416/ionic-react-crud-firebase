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
            // Don't save the base64 representation of the photo data, 
            // since it's already saved on the Filesystem
            const taskCopy = { ...p };
            return taskCopy;
        })));

    }

    return {
        tasks,
        saveTask
    };
}

export interface Task {
    title: string;
    description: string;
}