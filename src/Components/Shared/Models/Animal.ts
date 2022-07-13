
interface AnimalModel{
    id:	string,
    name: string,
    description: string,
    dayAge: number,
    isCar: boolean,
    sex	: number,
    Enum: number,
    pricing: number,
}

interface AnimalPaging{
    pageNumber: number,
    pageSize: number,
    id?:	string,
    name?: string,
    dayAge?: number,
    sex?: number,
}

export type {AnimalModel,AnimalPaging}