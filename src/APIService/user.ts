import { JWT } from "../accessToken";

export default class User {
    //1
    static async getOrCreateUser(accessToken: JWT): Promise<void> {
        console.log("get or create user");
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + "/v1/users", {
                method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
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
}