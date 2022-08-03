import { type } from "@testing-library/user-event/dist/type";
import { Space, Button, Typography } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import {
  AttributeModel,
  ReportModel,
  ReportValueModel,
} from "Components/Shared/Models/Form";
import "./antd-override.css";

const AttrsToColumns = (attrs: AttributeModel[]) => {
  attrs.sort((a, b) => a.sortNo - b.sortNo);
  const columns: ColumnsType<any> = attrs.map((_, idx) => {
    return {
      title: _.name,
      dataIndex: _.id,
      key: idx,
      render(value, record, index) {
        return (
          <>
            <p data-label={_.name}>{record[_.id]}</p>
          </>
        );
      },
    };
  });

  return columns;
};

const ReportToData = (id: string, values: ReportValueModel[], idx: number) => {
  values.sort((a, b) => a.sort - b.sort);

  const dt: any = {};
  dt["key"] = idx;
  dt["id"] = id;
  values.map((_) => {
    dt[_.attributeId] = _.value;
  });

  return dt;
};

const ReportsToSource = (reports: ReportModel[]) => {
  const values = reports.map((_) => {
    return { id: _.id, values: _.values };
  });
  const source = values.map((value, idx) => {
    return ReportToData(value.id, value.values, idx);
  });

  return source;
};

export { AttrsToColumns, ReportToData, ReportsToSource };
