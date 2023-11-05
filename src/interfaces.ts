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
    lessons: Lesson[];
    name: string;
    clas: Clas;
    isPublicShared: boolean;
}

export interface AssignedNote {
    courseUrl: string;
    lessonUrl: string;
    markbookUrl: string;
    assignedDate: Date;
    lessonId: string;
}

export interface Lesson {
    rows: Row[];
    name: string;
    assignedNotes: AssignedNote[];
}


export interface Row {
    _id: string;
    comment: string;
    title: string;
    purpose: string;
    leftRight: string[];
}

