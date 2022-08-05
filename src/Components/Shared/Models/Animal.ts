import { SexType } from "./User";

interface AnimalModel{
    id?:	string,
    name?: string,
    description?: string,
    dayAge?: number,
    isCar?: boolean,
    sex?	: number,
    Enum?: number,
    pricing?: number,
    animalName?:string;
    animalId?:string;
    amount?:number;
    animalSex?:SexType;
    reportTicketId?:string;
}

interface CreateAnimalItemModel{
  id:	string,
  isCar?: boolean,
  animalName?:string;
  amount:number;
  reportTicketId?:string;
}

interface AnimalPaging{
    pageNumber: number,
    pageSize: number,
    id?:	string,
    name?: string,
    dayAge?: number,
    sex?: number,
}

  ///////////////////
  enum AnimalSexType{
    "Giống đực"=1,
    "Giống cái" =2,
  }
  export {AnimalSexType}
  ///////////////////

export type {AnimalModel,AnimalPaging,CreateAnimalItemModel}