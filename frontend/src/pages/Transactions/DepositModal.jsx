import React from "react";
import { Modal, Form, message } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../apicalls/transactions";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/LoadersSlice";
import { ReloadUser } from "../../redux/UsersSlice";

function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await DepositFunds({
        token,
        amount: form.getFieldValue("amount"),
      });
      dispatch(HideLoading());
      if (response.success) {
        reloadData();
        setShowDepositModal(false);
        message.success(response.message);
        dispatch(ReloadUser(true));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <div className="flex flex-col gap-1 p-r-2">
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: "Please enter amount" },
              {
                validator: (_, value) =>
                  value >= 50
                    ? Promise.resolve
                    : Promise.reject("Minimum deposit amount is ₹50"),
              },
            ]}
          >
            <input type="number" className="br-6" />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <button className="primary-outlined-btn br-6">Cancel</button>
            <StripeCheckout
              token={onToken}
              currency="INR"
              amount={form.getFieldValue("amount") * 100} //INR to Paise
              shippingAddress
              billingAddress
              stripeKey="pk_test_51QwMu8A41sVZKWTa8MTrttPngkDw1P5ARN4cnIedw05ri2GPyQnriWHe2FOvepXjMtroRW46ePi3lvUy9sBLnPGt00bCweDlFv"
            >
              <button className="primary-contained-btn br-6">Deposit</button>
            </StripeCheckout>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default DepositModal;
