import { ColumnType } from "antd/lib/table";
import { SetStateAction } from "react";
import { ControlType, DataType } from "./FormEnums";

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
    dataType: DataType;
    controlType: ControlType;
    sortNo: number;
}

interface RenderProps {
    form: FormModel;
    reportvalue?: ReportModel;
    submitmethod: string;
    apiRoute: string;
}

interface ReportModel {
    id?: string;
    name: string;
    userId: string;
    formId: string;
    type: number;
    values: ReportValueModel[];
}

interface ReportValueModel {
    id?: string;
    attributeId: string;
    value: string;
    reportId?: string;
    animalId?: string;
}

interface TableProps {
    datasource: any[];
    columns: ColumnType<any>[];
}

type RenderAttrsProp = {
    attrs: AttributeModel[],
    report: ReportModel,
    setReport: React.Dispatch<SetStateAction<ReportModel>>,
}

type AttrsProps = {
    props: RenderAttrsProp;
}

interface ReportQueryModel {
    pageNumber: number;
    pageSize: number;
    id?: string;
    type?: number;
    userId?: string;
    dateStart?: string;
    dateEnd?: string;
}

export type {AttributeModel,FormModel,RenderProps,ReportModel,ReportValueModel,TableProps,AttrsProps,RenderAttrsProp,ReportQueryModel}