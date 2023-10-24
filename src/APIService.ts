import { JWT } from "./accessToken";


export class APIService {
    //1
    static async getOrCreateUser(accessToken: JWT) {
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

        }
    }

    //2
    static async createClass(className: string, userId: string) {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/classes", {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        name: className,
                        ownerId: userId
                    })
            })
                .then(response => response.json());
        }
        catch {

        }
    }

    //3
    static async getClassesOfUser(userId: string) {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/users/${userId}/classes`, {
                method: 'get', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {

        }
    }

    //4
    static async deleteClass(classId: string, userId: string) {
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

        }
    }

    //5
    static async renameClass(classId: string, name: string) {
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

        }
    }

    //6
    static async getTopicsOfClass(classId: string) {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/classes/${classId}/topics`, {
                method: 'get', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json());
        }
        catch {

        }
    }

    //7 create library topics - not used by client

    //8 create new topic in clas
    static async createNewTopicInClas(name: string, classId: string) {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/classes/${classId}/topics`, {
                method: 'post', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        name: name
                    })
                
            })
                .then(response => response.json());
        }
        catch {

        }
    }

}