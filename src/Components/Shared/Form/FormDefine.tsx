/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Layout, Row, Table } from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { ColumnType } from "antd/lib/table";
import Column from "antd/lib/table/Column";
import { RouteEndpoints } from "Components/router/MainRouter";
import { useAuth } from "Modules/hooks/useAuth";
import React from 'react'
import { useNavigate } from "react-router-dom";

interface FormModel {
    id: string;
    formNumber: string;
    formName: string;
    formCode: string;
    attributes: AttributeModel[];
}

interface AttributeModel {
    id: string;
    name: string;
    dataType: DataType;
    controlType: ControlType;
    sortNo: number;
}

enum DataType {
    string,
    number,
    datetime,
}
enum ControlType {
    input,
    checkbox,
    radio,
    select
}

interface Props {
    form: FormModel;
    reportvalue?: ReportModel;
}

interface ReportModel {
    id?: string;
    name: string;
    userId: string;
    formId: string;
    type: number;
    values: ReportValueModel[];
}

interface ReportValueModel {
    id?: string;
    attributeId: string;
    value: string;
    reportId?: string;
    animalId?: string;
}

const CreateReportModel = (form: FormModel, report?: ReportModel) => {
    const user = useAuth();
    const model: ReportModel = {
        id: report?.id,
        name: form.formName,
        userId: user.userId,
        formId: form.id,
        type: 1,
        values: CreateReportValueModel(form.attributes, report?.values),
    };

    return model;
}

const CreateReportValueModel = (attrs: AttributeModel[], values?: ReportValueModel[]) => {
    function findValue(id: string) {
        return values?.find(x => x.attributeId === id);
    }

    const attrvalues: ReportValueModel[] = attrs.map(attr => {
        const reportval: ReportValueModel = {
            attributeId: attr.id,
            value: findValue(attr.id)?.value,
            animalId: findValue(attr.id)?.animalId,
        };
        return reportval;
    })

    return attrvalues;
}


const CreateMapReportTable = (props: { form: FormModel, reports: ReportModel[] }) => {
    const { form, reports } = props;
    const naviagte = useNavigate();
    function findAttr(id: string): AttributeModel {
        return form.attributes.find(x => x.id === id);
    }

    const reportobjs = reports.map(x => {
        const report: any = {
            id: x.id,
            formid: x.formId,
            userId: x.userId,
            name: x.name,
        }
        x.values.map(attr => {
            const formattr = findAttr(attr.attributeId);
            if (formattr?.id) {
                Object.defineProperty(report, formattr.id, {
                    value: attr.value
                })
            }
        })
        return report;
    })

    const columns = () => {
        const cols = form.attributes.sort(x => x.sortNo).map(attr => {
            const column: ColumnType<any> = {
                title: attr.name,
                dataIndex: attr.id,
                key: attr.id,
                // responsive: ["md"],
            }

            return column
        })
        if (!cols.find(x => x.title === "Xử lý")) {
            cols.push({
                title: "Xử lý",
                dataIndex: "",
                key: getKeyThenIncreaseKey(),
                // responsive: ["md"],
                render: (record) => {
                    return (
                        <>
                            <Button type="link" color="blue" onClick={() => {
                                naviagte(RouteEndpoints.quarantine.updatereport, { state: { reportId: record.id } })
                            }}>Cập nhật</Button>
                            <Button type="link" danger>Xóa</Button>
                        </>
                    )
                }
            })
        }
        return cols;
    }


    console.log(reportobjs)
    return (
        <Table
            locale={{ emptyText: "Không có báo cáo!" }}
            dataSource={reportobjs}
            columns={columns()}
            size={"small"}
        />
    );
}

export { ControlType, DataType, CreateReportModel, CreateMapReportTable };
export type { FormModel, AttributeModel, Props, ReportModel, ReportValueModel };
