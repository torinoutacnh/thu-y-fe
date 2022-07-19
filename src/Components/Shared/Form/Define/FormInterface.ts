import { FormModel, ReportModel } from "Components/Shared/Models/Form";

enum ReportType{
    "CN-KDĐV-UQ" = 1,
    "ĐK-KDĐV-001" = 2,
    "BB-VSTY" = 3,
    "NK-001" = 4,
}

enum QuarantineReportType{
    "CN-KDĐV-UQ" = 1,
    "ĐK-KDĐV-001" = 2,
    "BB-VSTY" = 3,
}

interface RenderProps {
    form: FormModel;
    reportvalue?: ReportModel;
    submitmethod: string;
    reportType?: ReportType;
}

export {ReportType, QuarantineReportType}
export type {RenderProps}