import React, { SetStateAction, useState } from 'react';
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

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const RenderForm: React.FC<Props> = ({ form }) => {
    const [report, setReport] = useState(CreateReportModel(form));
    const user = useAuth();
    function submit() {
        if (user?.token) {
            console.log(report)
            fetch(process.env.REACT_APP_API.concat(ApiRoute.createreport), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(user.token),
                },
                body: JSON.stringify(report)
            }).then(res => res.json()).then((data) => {
                console.log(data);
            }).catch(error => console.log(error));
        }
    }

    return (
        <>
            {form && <Form
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
                title={form.formName}
                onFinish={submit}
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
    function RenderControlType(attr: AttributeModel) {
        switch (attr.controlType) {
            case ControlType.checkbox:
                {
                    const index = report.values?.findIndex(x => {
                        return x.attributeId == attr.id;
                    });
                    return (
                        <Input key={attr.id} name={attr.name}
                            value={report.values[index].value || ""}
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
                    const index = report.values?.findIndex(x => {
                        return x.attributeId == attr.id;
                    });
                    return (
                        <Input key={attr.id} name={attr.name}
                            value={report.values[index].value || ""}
                            onChange={(e) => {
                                setReport(pre => {
                                    pre.values[index].value = e.target.value;
                                    return pre;
                                });
                            }}
                        />
                    )
                }
            case ControlType.select:
                {
                    const index = report.values?.findIndex(x => {
                        return x.attributeId == attr.id;
                    });
                    return <Input key={attr.id} name={attr.name}
                        value={report.values[index].value || ""}
                        onChange={(e) => {
                            setReport(pre => {
                                pre.values[index].value = e.target.value;
                                return pre;
                            });
                        }}
                    />
                }
            case ControlType.radio:
                {
                    const index = report.values?.findIndex(x => {
                        return x.attributeId == attr.id;
                    });
                    return <Input key={attr.id} name={attr.name}
                        value={report.values[index].value || ""}
                        onChange={(e) => {
                            setReport(pre => {
                                pre.values[index].value = e.target.value;
                                return pre;
                            });
                        }}
                    />
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