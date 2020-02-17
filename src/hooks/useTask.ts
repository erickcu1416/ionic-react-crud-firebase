import { useState, useEffect } from "react";
import { useStorage } from '@ionic/react-hooks/storage';
import { useFilesystem } from '@ionic/react-hooks/filesystem';

const TASK_STORAGE = "tasks";

export function useTask() {
    const [ tasks, setTasks ] = useState<Task[]>([]);
    const { get, set } = useStorage();
    const { readFile } = useFilesystem();
    

    const loadSaved = async () => {
        const newTasks = await getTasks();
        setTasks(newTasks);
        return newTasks;
    };
    
    useEffect(() => {
        loadSaved();
    }, [get, readFile]);

    const getTasks = async () => {
        const tasksString = await get(TASK_STORAGE);
        const tasks = (tasksString ? JSON.parse(tasksString) : []) as Task[];
        return tasks;
    }

    const getTaskById = async (id: number) => {
        const a = await getTasks();
        const task = a.find(x => x.id === Number(id));
        return task;
    }

    const saveTask = async (task: Task) => {
        const taskget =  await getTasks();
        const newTasks = [task, ...taskget];
        set(TASK_STORAGE, JSON.stringify(newTasks.map(p => {
            const taskCopy = { ...p };
            return taskCopy;
        })));

        setTasks(newTasks);
        return task;
    }

    const editTask = async (task: Task) => {
        await deleteTask(task);
        await saveTask(task);
        return task;
    }

    const deleteTask = async (task: Task) => {
      
        const taskget =  await getTasks();

        let newTasks: Task[] = [];
        for (const x of taskget) {
            if (x.id !== Number(task.id)) {
                newTasks.push(x);
            }
        }

        setTasks(newTasks);
        set(TASK_STORAGE, JSON.stringify(newTasks));
        
    }

    return {
        tasks,
        getTaskById,
        saveTask,
        deleteTask,
        editTask
    };
}

export interface Task {
    id: number;
    title: string;
    description: string;
}