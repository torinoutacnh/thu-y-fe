import { TableProps } from "antd";
import {
  QuarantineReportType,
  RenderProps,
  ReportType,
} from "./interfaces/FormInterface";
import { RenderForm } from "./form/RenderComponent";
import { MapTable } from "./table/CustomTable";

export { RenderForm, MapTable, ReportType, QuarantineReportType };
export type { RenderProps, TableProps };
