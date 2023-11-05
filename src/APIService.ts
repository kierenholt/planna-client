import { JWT } from "./accessToken";
import { Clas, Lesson, Topic } from "./interfaces";


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
    static async createNewTopic(name: string, classId: string, lessons: Lesson[] = []): Promise<Topic> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/topics`, {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        name: name,
                        lessons: lessons,
                        clas: classId
                    })
                
            })
                .then(response => response.json());
        }
        catch {
            throw("error in createNewTopicInClass");
        }
    }

}