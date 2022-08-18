import { FormModel, ReportModel } from "Components/Shared/Models/Form";

enum ReportType {
    "CN-KDĐV-UQ" = 1,
    "ĐK-KDĐV-001" = 2,
    "BB-VSTY" = 3,
    "NK-001" = 4,
    "CN-KDSPĐV-UQ" = 5,
}

enum QuarantineReportType {
    "CN-KDĐV-UQ" = 1,
    "ĐK-KDĐV-001" = 2,
    "BB-VSTY" = 3,
}

enum AbattoirReportType {
    "NK-001" = 4,
    "CN-KDSPĐV-UQ" = 5,
}

interface RenderProps {
    form: FormModel;
    reportvalue?: ReportModel;
    submitmethod: string;
    reportType?: ReportType;
    pdf1?: string;
    pdf7?: string;
}

export { ReportType, QuarantineReportType, AbattoirReportType }
export type { RenderProps }