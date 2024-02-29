import { ITask } from "../interfaces";

export default class Task {
    
    //8 create new default task in topic
    static async create(name: string, topicId: string): Promise<ITask> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/tasks`, {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        name: name,
                        topic: topicId
                    })
                
            })
                .then(response => response.json());
        }
        catch {
            throw("error in createNewTask");
        }
    }

    //9 get task names
    static async getTaskNamesOfTopic(topicId: string): Promise<ITask[]> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/tasks/topic/${topicId}?name`, {
                method: 'get', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {
            throw("error in getTaskNamesOfTopic"); 
        }
    }
}