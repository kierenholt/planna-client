import { ITask } from "../interfaces";

export default class Task {

    //8 create new default task in topic
    static async create(topicId: string): Promise<ITask> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/tasks`, {
                method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topicId: topicId })
            })
                .then(response => response.json());
        }
        catch {
            throw ("error in create default task");
        }
    }

    //9 get task names
    static async getTaskNamesOfTopic(topicId: string): Promise<ITask[]> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/tasks/topic/${topicId}/name`, {
                method: 'GET', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {
            throw ("error in getTaskNamesOfTopic");
        }
    }

    //3 delete task
    static async delete(taskId: string): Promise<ITask> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/tasks/` + taskId, {
                method: 'DELETE', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {
            throw ("error in delete task");
        }
    }

    //3 rename task
    static async rename(taskId: string, newName: string): Promise<ITask> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/tasks/` + taskId, {
                method: 'PATCH', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: newName})
            })
                .then(response => response.json());
        }
        catch {
            throw ("error in rename task");
        }
    }
}