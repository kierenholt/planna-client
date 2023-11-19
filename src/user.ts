import { JWT } from "./accessToken";

export class LoggedInUser {
    email: string;
    name: string;
    picture: string;
    _id: string;

    constructor(accesstoken: JWT) {
        this.email = accesstoken.email;
        this.name = accesstoken.name;
        this.picture = accesstoken.picture;
        this._id = "G" + accesstoken.sub;
    }
}