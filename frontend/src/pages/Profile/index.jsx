import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, message } from "antd";
import { GetUserInfo, RequestProfileUpdate } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/LoadersSlice";
function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await GetUserInfo();
        dispatch(HideLoading());
        if (response.success) {
          form.setFieldsValue(response.data);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error("Failed to fetch user details");
      }
    };
    fetchUserData();
  }, [form]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      setLoading(true);
      const response = await RequestProfileUpdate(values);
      setLoading(false);
      dispatch(HideLoading());
      if (response.success) {
        message.success("Profile update request sent successfully.");
        setIsEditing(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="m-3">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl">qPay - Profile</h1>
        <button
          className="primary-outlined-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Update Profile"}
        </button>
      </div>
      <hr />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={!isEditing}
      >
        <Row gutter={36}>
          <Col span={6}>
            <Form.Item label="First Name" name="firstName">
              <input type="text" disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Last Name" name="lastName">
              <input type="text" disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Email" name="email">
              <input type="email" disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Mobile" name="mobileNumber">
              <input type="number" disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Identification Type" name="identificationType">
              <select disabled={!isEditing}>
                <option value="NATIONAL ID">National ID</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVING LICENSE">Driving License</option>
                <option value="SOCIAL CARD">Social Security Card (SSN)</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Identification Number"
              name="identificationNumber"
            >
              <input type="text" disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Address" name="address">
              <textarea type="text" disabled={!isEditing} />
            </Form.Item>
          </Col>
        </Row>
        {isEditing && (
          <div className="flex justify-end">
            <button
              className="primary-contained-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Request Update"}
            </button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Profile;
