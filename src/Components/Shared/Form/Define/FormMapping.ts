import { ColumnsType, ColumnType } from "antd/lib/table";
import { AttributeModel, ReportModel, ReportValueModel } from "Components/Shared/Models/Form";

const AttrsToColumns = (attrs:AttributeModel[])=>{
    attrs.sort((a,b)=>a.sortNo-b.sortNo)
    const columns:ColumnsType<any> = attrs.map((_,idx)=>{return {
        title:_.name,
        dataIndex:_.id,
        key:idx,
    }})

    return columns;
}

const ReportToData = (values:ReportValueModel[],idx:number)=>{
    values.sort((a,b)=>a.sort-b.sort)

    const dt:any = {}; 
    dt["key"] = idx;
    values.map((_)=>{
        dt[_.attributeId] = _.value
    })

    return dt;
}

const ReportsToSource = (reports:ReportModel[])=>{
    const values = reports.map(_=>_.values);
    const source = values.map((value,idx)=>{
        return ReportToData(value,idx);
    })

    return source;
}

export {AttrsToColumns,ReportToData,ReportsToSource}