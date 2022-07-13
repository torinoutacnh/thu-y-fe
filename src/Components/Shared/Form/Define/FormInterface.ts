import { FormModel, ReportModel } from "Components/Shared/Models/Form";


interface RenderProps {
    form: FormModel;
    reportvalue?: ReportModel;
    submitmethod: string;
    apiRoute: string;
    isQuarantined?: ReportType;
}

enum ReportType{
    QuarantineReport = 1,
    DailyAmountReport = 2
}
export {ReportType}
export type {RenderProps}