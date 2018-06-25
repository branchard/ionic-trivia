export enum Difficulties {
    easy = 5,
    medium = 10,
    hard = 20
}

export interface Category {
    id: number;
    name: string;
}

export interface Answer {
    text: string;
    correct: boolean;
}

export interface Question {
    category: string;
    text: string;
    answers: Array<Answer>;
}

export interface Game {
    difficulty: Difficulties;
    category: Category;
    score: number;
    timerStart: number;
    timer: number;
    questions: Array<Question>
}