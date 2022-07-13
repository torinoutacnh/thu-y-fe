import { TableProps } from "antd";
import React from "react";
import { RenderProps } from "./Define/FormInterface";
import {
  RenderReportTable,
  CreateReportModel,
  CreateReportValueModel,
} from "./Implement/FormRender";
import { RenderForm } from "./Implement/RenderComponent";

export {
  RenderForm,
  CreateReportModel,
  RenderReportTable,
  CreateReportValueModel,
};
export type { RenderProps, TableProps };
