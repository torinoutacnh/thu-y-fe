import { AnimalModel } from "./Animal";

interface FormModel {
    id: string;
    formNumber: string;
    formName: string;
    formCode: string;
    attributes: AttributeModel[];
}
interface AttributeModel {
    id: string;
    name: string;
    dataType: DataTypes;
    controlType: ControlTypes;
    sortNo: number;
}

interface ReportModel {
    id?: string;
    name: string;
    userId: string;
    formId: string;
    type: number;
    values: ReportValueModel[];
    listAnimals:AnimalModel[];
    sealTabs:SealValueModel[]
}

interface SealValueModel{
    id: string;
    codeSeal: string;
    name: string;
    content: string;
    id_Pricing: string;
}

interface ReportValueModel {
    id?: string;
    attributeId: string;
    attributeName?:string;
    value: string;
    reportId?: string;
    animalId?: string;
}

interface ReportQueryModel {
    pageNumber: number;
    pageSize: number;
    id?: string;
    formId?:string;
    type?: number;
    userId?: string;
    dateStart?: string;
    dateEnd?: string;
}

enum ControlTypes
{
    InputType = 1,
    DropDownListType = 2
}

enum DataTypes
{
    TextControl = 1,
    TelControl = 2,
    DateControl = 3,
    EmailControl = 4,
    DatetimeLocalControl = 5,
    ImageControl = 6,
    PasswordControl = 7,
    NumberControl = 8
}

export {DataTypes,ControlTypes}
export type {AttributeModel,FormModel,ReportModel,ReportValueModel,ReportQueryModel,SealValueModel}