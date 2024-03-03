import { ITopic } from "../interfaces";

export default class Topic {

    //1 get topic names of class
    static async getTopicNamesOfClass(classId: string): Promise<ITopic[]> {
        try { 
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/topics/class/${classId}/name`, {
                method: 'GET', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {
            throw("error in getTopicNamesOfClass"); 
        }
    }

    //2 create default topic
    static async createDefault(clasId: string): Promise<ITopic> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/topics", {
                method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({clasId: clasId})
            })
            .then(response => response.json());
        }
        catch {
            throw("error in clone default topic");
        }
    }

    //3 delete topic
    static async delete(topicId: string): Promise<void> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/topics/" + topicId, {
                method: 'DELETE', mode: 'cors', headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json());
        }
        catch {
            throw("error in delete topic");
        }
    }
    

    //4 rename topic
    static async rename(topicId: string, newName: string): Promise<ITopic> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/topics/" + topicId, {
                body: JSON.stringify({name: newName}),
                method: 'PATCH', mode: 'cors', headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json());
        }
        catch {
            throw("error in rename topic");
        }
    }
}