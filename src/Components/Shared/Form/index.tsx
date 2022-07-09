/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Col,
    Row,
} from 'antd';
import { AttributeModel, ControlType, CreateReportModel, FormModel, Props, ReportModel } from './FormDefine';
import { ApiRoute } from 'Api/ApiRoute';
import { useAuth } from 'Modules/hooks/useAuth';

const RenderForm: React.FC<Props> = ({ form, reportvalue, submitmethod }) => {
    const [formref] = Form.useForm<any>();
    const [report, setReport] = useState(CreateReportModel(form, reportvalue));
    const user = useAuth();
    function submit() {
        if (user?.token) {
            console.log(report)
            fetch(process.env.REACT_APP_API.concat(ApiRoute.updatereport), {
                method: submitmethod,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(user.token),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Request-Method': submitmethod,
                },
                body: JSON.stringify(report)
            }).then(res => res.json()).then((data) => {
                console.log(data);
            }).catch(error => console.log(error));
        }
    }

    useEffect(() => formref.resetFields(), [form, reportvalue]);


    const initValues = () => {
        const init: any = {};
        report.values.map(x => {
            init[x.attributeId] = x.value
            // Object.defineProperty(init, x.attributeId, {
            //     get value() { return x.value }
            // })
            return;
        })
        return init;
    }

    return (
        <>
            {form && <Form
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
                title={form.formName}
                onFinish={submit}
                form={formref}
                initialValues={initValues()}
            >
                <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ margin: 0 }}>
                    <h2>{form.formCode} - {form.formNumber}</h2>
                </Form.Item>
                <Form.Item>
                    <Input value={form.id} hidden={true} />
                </Form.Item>
                <Input.Group>
                    <RenderAttributes props={{ attrs: form.attributes, report, setReport }} />
                </Input.Group>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type='primary' htmlType='submit'>Lưu</Button>
                </Form.Item>
            </Form>}
        </>
    );
}

type RenderAttrsProp = {
    attrs: AttributeModel[],
    report: ReportModel,
    setReport: React.Dispatch<SetStateAction<ReportModel>>,
}

type AttrsProps = {
    props: RenderAttrsProp;
}

function RenderAttributes({ props: { attrs, report, setReport } }: AttrsProps) {
    function findAttr(id: string) {
        return report.values?.findIndex(x => {
            return x.attributeId == id;
        });
    }
    function RenderControlType(attr: AttributeModel) {
        switch (attr.controlType) {
            case ControlType.checkbox:
                {
                    const index = findAttr(attr.id);
                    return (
                        <Input key={attr.id} name={attr.id}
                            onChange={(e) => {
                                setReport(pre => {
                                    pre.values[index].value = e.target.value;
                                    return pre;
                                });
                            }}
                        />
                    )
                }
            case ControlType.input:
                {
                    const index = findAttr(attr.id);
                    return (
                        <Input key={attr.id} name={attr.id}
                            onChange={(e) => {
                                setReport(pre => {
                                    pre.values[index].value = e.target.value;
                                    return pre;
                                });
                            }}
                        />
                    )
                }
        }
    }

    return (
        <Row>
            {attrs && attrs.sort(attr => attr.sortNo).map((attr, index) => {
                return (
                    <Col key={index} lg={8}>
                        <Form.Item name={attr.id} label={attr.name}>
                            {RenderControlType(attr)}
                        </Form.Item>
                    </Col>
                );
            })}
        </Row>
    )
}

export type { FormModel, AttributeModel }
export { RenderForm }