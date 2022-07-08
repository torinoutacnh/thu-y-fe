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
} from 'antd';
import { AttributeModel, ControlType, CreateReportModel, FormModel, Props, ReportModel } from './FormDefine';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const RenderForm: React.FC<Props> = ({ form }) => {
    const [report, setReport] = useState(CreateReportModel(form));
    return (
        <>
            {form && <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                layout="horizontal"
                title={form.formName}
            >
                <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ margin: 0 }}>
                    <h2>{form.formCode} - {form.formNumber}</h2>
                </Form.Item>
                <Form.Item>
                    <Input value={form.id} hidden={true} />
                </Form.Item>
                <RenderAttributes props={{ attrs: form.attributes, report, setReport }} />
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button>Lưu</Button>
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

type Props = {
    props: RenderAttrsProp;
}

function RenderAttributes({ props: { attrs, report, setReport } }: Props) {
    function RenderControlType(attr: AttributeModel) {
        switch (attr.controlType) {
            case ControlType.checkbox:
                return <Input key={attr.id} />;
            case ControlType.input:
                return <Input key={attr.id} />;
            case ControlType.select:
                return <Input key={attr.id} />;
            case ControlType.radio:
                return <Input key={attr.id} />;
        }
    }
    return (
        <>
            {attrs && attrs.sort(attr => attr.sortNo).map((attr, index) => {
                return (
                    <Form.Item key={index} name={attr.id} label={attr.name}>
                        {RenderControlType(attr)}
                    </Form.Item>
                );
            })}
        </>
    )
}

export type { FormModel, AttributeModel }
export { RenderForm }