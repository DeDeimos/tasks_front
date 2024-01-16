import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";


const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });


  const [isLogin, setIsLogin] = useState(true);
  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  console.log(formData);

  return (
    <Row className="justify-content-center">
      <Col xs={10} md={4}>
        <Card className="my-5 px-5 py-3">
          <h1 className="m-3 text-center">Sign {isLogin ? "In" : "Up"}</h1>
          {!isLogin && (
            <Form.Group className="my-2">
              <Form.Label>���</Form.Label>
              <Form.Control
                type="text"
                placeholder="���"
                name="name"
                onChange = {handleChange}
              />
            </Form.Group>
          )}
          <Form.Group className="my-2">
            <Form.Label>Email �����</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              name="email"
              onChange = {handleChange}
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>������</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              onChange = {handleChange}
            />
          </Form.Group>
          {!isLogin && (
            <Form.Group className="my-2">
              <Form.Label>����������� ������</Form.Label>
              <Form.Control
                type="password"
                placeholder="������� ������ ��������"
                name="password2"
                onChange = {handleChange}
              />
            </Form.Group>
          )}
          <div className="mt-3 text-center">
            <p>
              {isLogin ? "��� ��������?" : "��� ���� �������"} ? {" "}
              <Button
                size="sm"
                variant="outline-primary"
                onClick={handleToggle}
              >
                {isLogin ? "������������������" : "�����"}
              </Button>
            </p>
            <Button className="btn btn-block">
              Sign {isLogin ? "�����" : "������������������"}
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Auth;