import { ColumnsType } from "antd/lib/table";
import {
  AttributeModel,
  DataTypes,
  ReportModel,
  ReportValueModel,
} from "Components/Shared/Models/Form";
import moment from "moment";

const RenderValueFormat = (dataType: DataTypes, data: string) => {
  switch (dataType) {
    case DataTypes.DateControl: {
      return moment(data).format("DD/MM/yyyy").toString();
    }

    default:
      return data;
  }
};

const AttrsToColumns = (attrs: AttributeModel[]) => {
  attrs.sort((a, b) => a.sortNo - b.sortNo);
  const columns: ColumnsType<any> = attrs.map((_) => {
    return {
      title: _.name,
      dataIndex: _.id,
      key: _.sortNo,
      render(value, record, index) {
        return (
          <>
            <p data-label={_.name}>
              {RenderValueFormat(_.dataType, record[_.id])}
            </p>
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
