import { ILesson, IRow, ITopic } from "../interfaces";


export default class Lesson {
    
    //1 get rows
    static async getIncludingRows(lessonId: string): Promise<ILesson> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/lessons/${lessonId}`, {
                method: 'get', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {
            throw("error in get lesson inc rows"); 
        }
    }
    
    //2 get lesson names
    static async getLessonNamesOfTopic(topicId: string): Promise<ILesson[]> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/lessons/topic/${topicId}/name`, {
                method: 'get', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {
            throw("error in getLessonNamesOfTopic"); 
        }
    }

    //3 create default lesson
    static async createDefault(topicId: string): Promise<ILesson> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/lessons/topic/" + topicId, {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json());
        }
        catch {
            throw("error in clone default lesson");
        }
    }
}