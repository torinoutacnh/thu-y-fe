import { Input, Row, Col, Form, Button } from "antd";
import { AttributeModel, AttrsProps, RenderProps, ReportModel } from "../Define/FormInterface";
import { CreateReportModel } from "./FormMap";
import React, { useEffect, useState } from "react";
import { useAuth } from "Modules/hooks/useAuth";
import { ControlType } from "../Define/FormEnums";

function RenderInput(props: { attr: AttributeModel, setReport: React.Dispatch<React.SetStateAction<ReportModel>> }) {
    const { attr, setReport } = props;

    return (
        <Input
            key={attr.id}
            name={attr.id}
            onChange={(e) => {
                setReport(pre => {
                    pre.values.find(x => x.attributeId === attr.id).value = e.target.value;
                    return pre;
                });
            }}
        />
    )
}

function RenderAttributes({ props: { attrs, setReport } }: AttrsProps) {

    function RenderControlType(attr: AttributeModel) {
        switch (attr.controlType) {
            case ControlType.checkbox:
                return <RenderInput attr={attr} setReport={setReport} />
            case ControlType.input:
                return <RenderInput attr={attr} setReport={setReport} />
        }
    }

    return (
        <Row>
            {attrs && attrs.sort(attr => attr.sortNo).map((attr, index) => {
                return (
                    <Col key={index} lg={8}>
                        <Form.Item
                            name={attr.id}
                            label={attr.name}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ paddingRight: 30 }}
                        >
                            {RenderControlType(attr)}
                        </Form.Item>
                    </Col>
                );
            })}
        </Row>
    )
}

const RenderForm: React.FC<RenderProps> = ({ form, reportvalue, submitmethod, apiRoute }) => {
    const [formref] = Form.useForm<any>();
    const [report, setReport] = useState(CreateReportModel(form, reportvalue));
    const user = useAuth();
    function submit() {
        if (user?.token) {
            console.log(report)
            fetch(process.env.REACT_APP_API.concat(apiRoute), {
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

    useEffect(() => {
        formref.resetFields();
    }, [form, reportvalue]);


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
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Col>
                        <h2>{form.formCode} - {form.formNumber}</h2>
                    </Col>
                </Form.Item>
                <Input value={form.id} hidden={true} />
                <RenderAttributes props={{ attrs: form.attributes, report, setReport }} />
                <Form.Item wrapperCol={{ offset: 11, }}>
                    <Button type='primary' htmlType='submit'>Lưu</Button>
                </Form.Item>
            </Form>}
        </>
    );
}

export { RenderForm }