import { ITopic } from "../interfaces";

export default class Topic {

    //1 get topic names of class
    static async getTopicNamesOfClass(classId: string): Promise<ITopic[]> {
        try { 
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/topics/class/${classId}/name`, {
                method: 'get', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {
            throw("error in getTopicNamesOfClass"); 
        }
    }

    //2 create default topic
    static async createDefault(classId: string): Promise<ITopic> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/topics/class/" + classId, {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json());
        }
        catch {
            throw("error in clone default topic");
        }
    }

    //3 delete topic
}