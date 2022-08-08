import { TableProps } from "antd";
import RenderForm from "./form/RenderComponent";
import {
  AbattoirReportType,
  QuarantineReportType,
  RenderProps,
  ReportType,
} from "./interfaces/FormInterface";
import MapTable from "./table/CustomTable";

export {
  RenderForm,
  MapTable,
  ReportType,
  QuarantineReportType,
  AbattoirReportType,
};
export type { RenderProps, TableProps };
