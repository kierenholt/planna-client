import { Helpers } from "../helpers";
import { IClas } from "../interfaces";

export default class Clas {

    //1 get class names of owner
    static async getClassNamesOfUser(userId: string): Promise<IClas[]> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/classes/owner/${userId}/name`, {
                method: 'GET', mode: 'cors', headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json());
        }
        catch {
            throw("error in getClassesOfUser");
        }
    }

    //2 delete class
    static async delete(classId: string): Promise<number> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/classes/" + classId, {
                method: 'DELETE', mode: 'cors', headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json());
        }
        catch {
            throw("error in deleteClass");
        }
    }

    //3 rename class
    static async rename(classId: string, newName: string): Promise<IClas> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/classes/" + classId, {
                method: 'PATCH', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: newName})
            })
            .then(response => response.json());
        }
        catch {
            throw("error in renameClass");
        }
    }

    //4 create default class
    static async createDefault(ownerId: string): Promise<IClas> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/classes", {
                method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ownerId: ownerId})
            })
            .then(response => {
                Helpers.renewObjectId();
                return response.json();
            });
        }
        catch {
            throw("error in clone default class");
        }
    }
}