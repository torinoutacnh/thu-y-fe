import { Button, Card, Descriptions } from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import Table, { ColumnType } from "antd/lib/table";
import { RouteEndpoints } from "Components/router/MainRouter";
import { useAuth } from "Modules/hooks/useAuth";
import useWindowSize from "Modules/hooks/useWindowSize";
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
    function findAttr(id: string): AttributeModel {
        return form.attributes.find(x => x.id === id);
    }
    const windowSize = useWindowSize();

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

        function deletereport(id: string) {
            return;
        }

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
                            <Button type="link" danger onClick={() => deletereport(record.id)}>Xóa</Button>
                        </>
                    )
                }
            })
        }
        return cols;
    }

    const RenderCards = () => {
        function RenderCard(data: any, key: number) {

            return (
                <Descriptions
                    bordered
                    // title={data.name}
                    column={{ lg: 2, md: 1, sm: 1, xs: 1 }}
                    size={"small"}
                    style={{ marginTop: key === 0 ? 10 : 50 }}
                    key={key}
                >
                    {
                        form.attributes.map((col, idx) => {

                            return (
                                <>
                                    <Descriptions.Item
                                        labelStyle={{ color: 'white', backgroundColor: '#17202A', width: '40%' }}
                                        contentStyle={{ color: '#17202A', backgroundColor: '#D5D8DC' }}
                                        key={idx}
                                        label={col.name}>
                                        {data[col.id]}
                                    </Descriptions.Item>
                                </>
                            );
                        })
                    }
                </Descriptions>
            )
        }
        return (
            <>
                {reportobjs && reportobjs.map((rep, idx) => RenderCard(rep, idx))}
            </>
        )
    }

    return (
        <>
            {windowSize.width > 1024 ? <Table
                locale={{ emptyText: "Không có báo cáo!" }}
                dataSource={reportobjs}
                columns={columns()}
                size={"small"}
            /> : <RenderCards />}
        </>
    );
}

export { CreateReportModel, CreateMapReportTable, CreateReportValueModel };