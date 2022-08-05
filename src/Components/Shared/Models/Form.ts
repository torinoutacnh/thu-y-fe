import { Moment } from "moment";
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
    value?:any;
    attributeCode?: string;
}

interface ReportModel {
    id?: string;
    name: string;
    userId: string;
    formId: string;
    type: number;
    userName?:string;
    dateCreated?:string;
    values: ReportValueModel[];
    listAnimals:AnimalModel[];
    sealTabs:SealValueModel[];
}

interface UpdateReportAttrsModel{
    reportId: string;
    values: ReportValueModel[];
}

interface SealValueModel{
    id: string;
    sealCode: string;
    sealName: string;
    content: string;
    id_Pricing: string;
    reportTicketId:string;
}

interface ReportValueModel {
    id?: string;
    attributeId: string;
    attributeName?:string;
    value: string|Date|number|Moment;
    sort: number;
    reportId?: string;
    animalId?: string;
    attributeCode?:string;
    formName?:string;
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
export type {UpdateReportAttrsModel,AttributeModel,FormModel,ReportModel,ReportValueModel,ReportQueryModel,SealValueModel}