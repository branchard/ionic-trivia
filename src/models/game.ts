export enum Difficulties {
    easy = 0,
    medium = 1,
    hard = 2
}

export interface Category {
    id: number
    name: string
}

export interface Game {
    difficulty: Difficulties
    category: Category
    score: number
    timerStart: number
}