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

enum DataType {
    string,
    number,
    datetime,
}
enum ControlType {
    input,
    checkbox,
    radio,
    select
}

interface Props {
    form: FormModel;
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

const CreateReportModel = (form: FormModel) => {
    const report: ReportModel = {
        name: form.formName,
        userId: null,
        formId: null,
        type: 1,
        values: CreateReportValueModel(form.attributes),
    };

    return report;
}

const CreateReportValueModel = (attrs: AttributeModel[]) => {
    const attrvalues: ReportValueModel[] = attrs.map(attr => {
        const reportval: ReportValueModel = {
            attributeId: attr.id,
            value: null,
            animalId: null,
        };
        return reportval;
    })

    return attrvalues;
}

export { ControlType, DataType, CreateReportModel };
export type { FormModel, AttributeModel, Props, ReportModel, ReportValueModel };
