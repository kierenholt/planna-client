import { ILesson, IRow, ITopic } from "../interfaces";


export default class Lesson {
    
    //1 get rows
    static async getIncludingRows(lessonId: string): Promise<ILesson> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/lessons/${lessonId}`, {
                method: 'GET', mode: 'cors', headers: { 'Content-Type': 'application/json' },
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
                method: 'GET', mode: 'cors', headers: { 'Content-Type': 'application/json' },
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
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/lessons", {
                method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({topicId: topicId})
            })
            .then(response => response.json());
        }
        catch {
            throw("error in create default lesson");
        }
    }

    //4 rename lesson
    static async rename(lessonId: string, newName: string): Promise<ILesson> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/lessons/" + lessonId, {
                method: 'PATCH', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: newName})
            })
            .then(response => response.json());
        }
        catch {
            throw("error in rename lesson");
        }
    }
    
    //5 delete lesson
    static async delete(lessonId: string): Promise<ILesson> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/lessons/" + lessonId, {
                method: 'DELETE', mode: 'cors', headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json());
        }
        catch {
            throw("error in delete lesson");
        }
    }
}