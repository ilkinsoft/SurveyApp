export interface Survey {
    _id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    questions: Question[];
}

interface Question{
    question:string;
    choices:string[];
    answers:Answer[];
}

export interface Answer{
    user_id:string;
    answer:string;
}

export interface Element {
    title: string;
    name: string;
    choices: Choice[];
}

export interface Choice {
    text: string;
    value: string;
}