import { TableProps } from 'antd';
import React from 'react';
import { DataType, ControlType } from './Define/FormEnums';
import { AttributeModel, FormModel, RenderProps, ReportModel, ReportValueModel, AttrsProps, RenderAttrsProp } from './Define/FormInterface';
import { CreateReportModel, CreateMapReportTable, CreateReportValueModel } from './Implement/FormMap';
import { RenderForm } from './Implement/RenderComponent';


export { RenderForm, DataType, ControlType, CreateReportModel, CreateMapReportTable, CreateReportValueModel }
export type { AttributeModel, FormModel, RenderProps, ReportModel, ReportValueModel, TableProps, AttrsProps, RenderAttrsProp }