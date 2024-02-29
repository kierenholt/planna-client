export interface IUser {
    _id: string; //GXXX for google
    name: string;
    email: string;
    picture?: string;
}

export interface IClas {
    _id: string;
    name: string;
    settings: string;
    owner: IUser;
}

export interface ITopic {
    _id: string;
    name: string;
    clas: IClas;
    isPublicShared: boolean;
}

export interface ITask {
    _id: string;
    name: string;
    topic: ITopic;
}

export interface ILesson {
    _id: string;
    name: string;
    topic: ITopic;
    rows: IRow[];
}

export interface IRow {
    _id: string;
    comment: string;
    title: string;
    purpose: string;
    leftRight: string[];
}

