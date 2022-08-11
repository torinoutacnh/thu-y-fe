import { Row, Col, Form, Input, DatePicker, Radio } from "antd";
import { AnimalSexType } from "Components/Shared/Models/Animal";
import {
  AttributeModel,
  DataTypes,
  FormModel,
} from "Components/Shared/Models/Form";
import moment from "moment";

function RenderFormAttrs(props: { form: FormModel }) {
  const { form } = props;

  return (
    <Row>
      {form.attributes
        .sort((x, y) => x.sortNo - y.sortNo)
        .map((attr, idx) => {
          return (
            <Col
              key={idx}
              lg={8}
              md={12}
              sm={12}
              xs={24}
              style={{ paddingRight: 30 }}
            >
              <Form.Item
                name={["values", idx, "attributeId"]}
                initialValue={attr.id}
                hidden={true}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["values", idx, "attributeName"]}
                initialValue={attr.name}
                hidden={true}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["values", idx, "sort"]}
                initialValue={attr.sortNo}
                hidden={true}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["values", idx, "attributeCode"]}
                initialValue={attr.attributeCode}
                hidden={true}
              >
                <Input />
              </Form.Item>
              <RenderControl attr={attr} idx={idx} />
            </Col>
          );
        })}
    </Row>
  );
}

function RenderControl(props: { attr: AttributeModel; idx: number }) {
  const { attr, idx } = props;
  switch (attr.dataType) {
    case DataTypes.TextControl: {
      return (
        <Form.Item
          label={attr.name}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name={["values", idx, "value"]}
          initialValue={attr.value ?? null}
        >
          <Input />
        </Form.Item>
      );
    }
    case DataTypes.NumberControl: {
      return (
        <Form.Item
          label={attr.name}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name={["values", idx, "value"]}
          initialValue={attr.value ?? ""}
          rules={[
            {
              type: "number",
              message: "Sai định dạng!",
              transform: (i) => Number(i),
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
      );
    }
    case DataTypes.DateControl: {
      return (
        <Form.Item
          label={attr.name}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name={["values", idx, "value"]}
          initialValue={
            attr.value ? moment(attr.value, "yyyyMMdd hh:mm:s") : moment()
          }
          getValueProps={(i) => {
            return { value: i ? moment(i) : moment() };
          }}
        >
          <DatePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
        </Form.Item>
      );
    }
    case DataTypes.EmailControl: {
      return (
        <Form.Item
          label={attr.name}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name={["values", idx, "value"]}
          initialValue={attr.value ?? null}
          rules={[
            {
              type: "email",
              message: "Email không đúng định dạng!",
              pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            },
          ]}
        >
          <Input />
        </Form.Item>
      );
    }
    case DataTypes.RadioControl: {
      // const options = attr.api_d.split(',').map(x=>Number(x));
      return (
        <Form.Item
          label={attr.name}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name={["values", idx, "value"]}
          initialValue={attr.value ?? null}
        >
          <Radio.Group>
            <Radio value={"Đực"}>{AnimalSexType[1]}</Radio>
            <Radio value={"Cái"}>{AnimalSexType[2]}</Radio>
          </Radio.Group>
        </Form.Item>
      );
    }
  }
}

export { RenderFormAttrs };
