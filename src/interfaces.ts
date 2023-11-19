export interface User {
    _id: string; //GXXX for google
    name: string;
    email: string;
    picture?: string;
}

export interface Clas {
    _id: string;
    name: string;
    settings: string;
    owner: User;
}

export interface Topic {
    _id: string;
    name: string;
    clas: Clas;
    isPublicShared: boolean;
}

export interface Task {
    _id: string;
    name: string;
    topic: Topic;
}

export interface Lesson {
    _id: string;
    name: string;
    topic: Topic;
    rows: Row[];
}

export interface Row {
    _id: string;
    comment: string;
    title: string;
    purpose: string;
    leftRight: string[];
}

