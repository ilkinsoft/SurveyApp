

export interface Answer {
    user_id: string;
    answer: string;
}

export interface ArticleAnswer {
    answer: string;
    count: number;
}

export interface Question {
    question: string;
    choices: string[];
    answers: Answer[];
    answerStatistic: number[];
    articleAnswer: ArticleAnswer[];
}

export interface RootObject {
    title: string;
    createdBy: string;
    createdAt: Date;
    questions: Question[];
}