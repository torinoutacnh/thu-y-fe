import { Button } from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import Table, { ColumnType } from "antd/lib/table";
import { RouteEndpoints } from "Components/router/MainRouter";
import { useAuth } from "Modules/hooks/useAuth";
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FormModel, AttributeModel } from "../Define/FormInterface";
import { ReportModel, ReportValueModel, TableProps } from "../Define/FormInterface";

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
            key: getKeyThenIncreaseKey()
        }
        x.values.map(attr => {
            const formattr = findAttr(attr.attributeId);
            if (formattr?.id) {
                report[formattr.id] = attr.value
                // Object.defineProperty(report, formattr.id, {
                //     value: attr.value
                // })
            }
        })
        return report;
    })

    const columns = () => {
        const cols = form.attributes.sort(x => x.sortNo).map(attr => {
            const column: ColumnType<any> = {
                title: attr.name,
                dataIndex: attr.id,
                key: getKeyThenIncreaseKey(),
                // responsive: ["lg"],
            }

            return column
        })
        if (!cols.find(x => x.title === "Xử lý")) {
            cols.push({
                title: "Xử lý",
                dataIndex: "",
                key: getKeyThenIncreaseKey(),
                render: (record) => {
                    return (
                        <>
                            <Link to={RouteEndpoints.quarantine.updatereport.replace(':id', record.id)} >
                                <Button type="link" color="blue" >Cập nhật</Button>
                            </Link>
                            <Button type="link" danger>Xóa</Button>
                        </>
                    )
                }
            })
        }
        return cols;
    }

    return (
        <>
            <Table
                locale={{ emptyText: "Không có báo cáo!" }}
                dataSource={reportobjs}
                columns={columns()}
                size={"small"}
            />
        </>
    );
}

export { CreateReportModel, CreateMapReportTable, CreateReportValueModel };
