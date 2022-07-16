import { FormModel, ReportModel } from "Components/Shared/Models/Form";

enum ReportType{
    QuarantineReport = 1,
    DailyAmountReport = 2
}

interface RenderProps {
    form: FormModel;
    reportvalue?: ReportModel;
    submitmethod: string;
    isQuarantined?: ReportType;
}

export {ReportType}
export type {RenderProps}