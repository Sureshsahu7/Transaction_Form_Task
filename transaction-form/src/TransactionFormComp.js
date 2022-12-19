import React, { useState } from "react";
import { Form, Button, Input, Select, Row, Col } from "antd";

const { Option } = Select;

function FormExample() {
  // Initialize the form data with three rows
  const [formData, setFormData] = useState([
    { account: "", debit: 0, credit: 0 },
    { account: "", debit: 0, credit: 0 },
    { account: "", debit: 0, credit: 0 },
  ]);

  // Initialize the total debit and credit values to 0
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  // Function to handle changes to the form data
  const handleChange = (index, field, value) => {
    // Update the value of the field in the form data
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);

    // Update the total debit and credit values

    let newTotalDebit = formData.reduce(
      (acc, { debit }) => acc + Number(debit),
      0
    );
    let newTotalCredit = formData.reduce(
      (acc, { credit }) => acc + Number(credit),
      0
    );

    // let newTotalDebit = 0;
    // let newTotalCredit = 0;
    // newFormData.forEach(row => {
    //   newTotalDebit += row.debit;
    //   newTotalCredit += row.credit;
    // });
    setTotalDebit(newTotalDebit);
    setTotalCredit(newTotalCredit);
  };

  // Function to add a new row to the form
  const addRow = () => {
    setFormData([...formData, { account: "", debit: 0, credit: 0 }]);
  };

  // Function to delete a row from the form
  const deleteRow = (index) => {
    setFormData(formData.filter((row, i) => i !== index));
  };

  // Function to format a number as Indian currency
  const formatIndianCurrency = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(num);
  };

  return (
    <Form>
      {formData.map((row, index) => (
        <Row key={index}>
          <Col span={8}>
            <Form.Item label="Account">
              <Select
                value={row.account}
                onChange={(value) => handleChange(index, "account", value)}
              >
                <Option value="account1">Account 1</Option>
                <Option value="account2">Account 2</Option>
                <Option value="account3">Account 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Debit Amount">
              <Input
                value={row.debit}
                onChange={(event) =>
                  handleChange(index, "debit", event.target.value)
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Credit Amount">
              <Input
                value={row.credit}
                onChange={(event) =>
                  handleChange(index, "credit", event.target.value)
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="link" onClick={() => deleteRow(index)}>
              Delete Row
            </Button>
          </Col>
        </Row>
      ))}
      <Button onClick={addRow}>Add Row</Button>
      <br />
      <br />
      <Row>
        <Col span={12}>
          <strong>Total Debit:</strong> {formatIndianCurrency(totalDebit)}
        </Col>
        <Col span={12}>
          <strong>Total Credit:</strong> {formatIndianCurrency(totalCredit)}
        </Col>
      </Row>
    </Form>
  );
}

export default FormExample;
