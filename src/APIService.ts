import { JWT } from "./accessToken";
import { Clas, Lesson, Row, Task, Topic } from "./interfaces";


export class APIService {
    //1
    static async getOrCreateUser(accessToken: JWT): Promise<void> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/users", {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: accessToken.email,
                    picture: accessToken.picture,
                    name: accessToken.name,
                    id: 'G' + accessToken.sub
                })
            })
                .then(response => response.json())
        }
        catch {
            throw("error in getOrCreateUser");
        }
    }

    //2
    static async createClass(className: string, userId: string): Promise<Clas> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/classes", {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        name: className,
                        owner: userId, 
                        settings: ""
                    })
            })
                .then(response => response.json());
        }
        catch {
            throw("error in createClass");
        }
    }

    //3
    static async getClassesOfUser(userId: string): Promise<Clas[]> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/classes/owner/${userId}`, {
                method: 'get', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {
            throw("error in getClassesOfUser");
        }
    }

    //4
    static async deleteClass(classId: string, userId: string): Promise<void> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/classes/" + classId, {
                method: 'delete', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        ownerId: userId
                    })
            })
                .then(response => response.json());
        }
        catch {
            throw("error in deleteClass");
        }
    }

    //5
    static async renameClass(classId: string, name: string): Promise<void> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/classes/" + classId, {
                method: 'put', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        name: name
                    })
            })
                .then(response => response.json());
        }
        catch {
            throw("error in renameClass");
        }
    }

    //6
    static async getTopicNamesOfClass(classId: string): Promise<Topic[]> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/topics/class/${classId}?name`, {
                method: 'get', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {
            throw("error in getTopicNamesOfClass"); 
        }
    }

    //7 create library topics - not used by client

    //8 create new topic in clas
    static async createNewTopic(name: string, classId: string): Promise<Topic> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/topics`, {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        name: name,
                        clas: classId
                    })
                
            })
                .then(response => response.json());
        }
        catch {
            throw("error in createNewTopic");
        }
    }

    //9 get lesson names
    static async getLessonNamesOfTopic(topicId: string): Promise<Lesson[]> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/lessons/topic/${topicId}?name`, {
                method: 'get', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {
            throw("error in getLessonNamesOfTopic"); 
        }
    }

    //8 create new topic in clas
    static async createNewLesson(name: string, topicId: string, rows: Row[] = []): Promise<Lesson> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/lessons`, {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        name: name,
                        topic: topicId,
                        rows: rows
                    })
                
            })
                .then(response => response.json());
        }
        catch {
            throw("error in createNewLesson");
        }
    }
    
    //9 get task names
    static async getTaskNamesOfTopic(topicId: string): Promise<Task[]> {
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
    
    //8 create new topic in clas
    static async createNewTask(name: string, topicId: string): Promise<Task> {
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
    
    //check response
    static async checkResponse(index: number, rowId: string, response: string, seed: number): Promise<Task> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/responses`, {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        index: index,
                        rowId: rowId,
                        response: response,
                        seed: seed
                    })
                
            })
            .then(response => response.json());
        }
        catch {
            throw("error in check response");
        }
    }
}