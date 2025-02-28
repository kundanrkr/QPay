import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, message } from "antd";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/LoadersSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/home");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      // message.error(response.message);
      message.error("Something went wrong! Please try again.");
    }
  };
  return (
    <div className="bg-primary flex items-center justify-center h-screen">
      <div className="card w-400 p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">qPay - Login</h1>
        </div>

        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                initialValue=""
                className="w-full p-r-2"
              >
                <input type="email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                initialValue=""
                className="w-full p-r-2"
              >
                <input type="password" />
              </Form.Item>
            </Col>
          </Row>
          <button className="primary-contained-btn w-100" type="submit">
            Login
          </button>
          <h1
            className="text-sm underline mt-2"
            onClick={() => navigate("/register")}
          >
            Not a member? Click here to Register
          </h1>
        </Form>
      </div>
    </div>
  );
}

export default Login;
