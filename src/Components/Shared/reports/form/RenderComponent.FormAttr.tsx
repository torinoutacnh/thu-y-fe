import { Row, Col, Form, Input, DatePicker, Radio, Collapse } from "antd";
import { AnimalSexType } from "Components/Shared/Models/Animal";
import {
  AttributeModel,
  DataTypes,
  FormModel,
} from "Components/Shared/Models/Form";
import { SexType } from "Components/Shared/Models/User";
import moment from "moment";


interface GroupAttributeModel {
  listAttbs?: AttributeModel[]
}


function RenderFormAttrs(props: { form: FormModel }) {
  const { form } = props;
  const { Panel } = Collapse;

  const uniqueNameGroup = [...new Set(form.attributes.map(obj => obj.attributeGroup))];

  const list: GroupAttributeModel[] = uniqueNameGroup.map(name => {
    return (
      { listAttbs: form.attributes.filter(i => i.attributeGroup === name).sort((x, y) => x.sortNo - y.sortNo) }
    )
  }).sort((x, y) => x.listAttbs[0].sortNo - y.listAttbs[0].sortNo)



  console.log("list => ", list);


  return (

    <Collapse style={{ marginBottom: "20px" }}>

      {
        list.map((item, index) => {
          return (
            <Panel header={<h4>{item.listAttbs[0].attributeGroup}</h4>} key={index}>
              <Row>
                {
                  item.listAttbs.map((i, idx) => {
                    return (

                      <Col
                        key={i.sortNo}
                        lg={8}
                        md={12}
                        sm={12}
                        xs={24}
                        style={{ paddingRight: 30 }}
                      >
                        <Form.Item
                          name={["values", i.sortNo, "attributeId"]}
                          initialValue={i.id}
                          hidden={true}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          name={["values", i.sortNo, "attributeName"]}
                          initialValue={i.name}
                          hidden={true}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          name={["values", i.sortNo, "sort"]}
                          initialValue={i.sortNo}
                          hidden={true}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          name={["values", i.sortNo, "attributeCode"]}
                          initialValue={i.attributeCode}
                          hidden={true}
                        >
                          <Input />
                        </Form.Item>

                        <RenderControl attr={i} idx={i.sortNo} />
                      </Col>

                    )
                  })
                }
              </Row>
            </Panel>
          )
        })
      }

    </Collapse>


    // <Row>
    //   {form.attributes
    //     .sort((x, y) => x.sortNo - y.sortNo)
    //     .map((attr, idx) => {
    //       return (
    //         <Col
    //           key={idx}
    //           lg={8}
    //           md={12}
    //           sm={12}
    //           xs={24} 
    //           style={{ paddingRight: 30 }}
    //         >
    //           <Form.Item
    //             name={["values", idx, "attributeId"]}
    //             initialValue={attr.id}
    //             hidden={true}
    //           >
    //             <Input />
    //           </Form.Item>
    //           <Form.Item
    //             name={["values", idx, "attributeName"]}
    //             initialValue={attr.name}
    //             hidden={true}
    //           >
    //             <Input />
    //           </Form.Item>
    //           <Form.Item
    //             name={["values", idx, "sort"]}
    //             initialValue={attr.sortNo}
    //             hidden={true}
    //           >
    //             <Input />
    //           </Form.Item>
    //           <Form.Item
    //             name={["values", idx, "attributeCode"]}
    //             initialValue={attr.attributeCode}
    //             hidden={true}
    //           >
    //             <Input />
    //           </Form.Item>
    //           <RenderControl attr={attr} idx={idx} />
    //         </Col>
    //       );
    //     })}
    // </Row>
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
            // attr.value ? moment(attr.value, "yyyyMMdd hh:mm:s") : moment()
            null
          }
          getValueProps={(i) => {
            return { value: i ? moment(i) : null };
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
            <Radio value={"Đực"}>
              {AnimalSexType[1]}
            </Radio>
            <Radio value={"Cái"}>
              {AnimalSexType[2]}
            </Radio>
          </Radio.Group>
        </Form.Item>
      );
    }
  }
}

export { RenderFormAttrs };
