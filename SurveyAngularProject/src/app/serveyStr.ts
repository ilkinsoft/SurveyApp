

    export interface Answer {
        user_id: string;
        answer: string;
    }

    export interface Question {
        question: string;
        choices: string[];
        answers: Answer[];
        answerStatistic : number[]
    }

    export interface RootObject {
        _id: string;
        title: string;
        createdBy: string;
        createdAt: Date;
        questions: Question[];
    }


