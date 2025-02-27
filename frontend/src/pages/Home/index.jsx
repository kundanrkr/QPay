import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  return (
    <div>
      <PageTitle
        title={`Hello ${user.firstName} ${user.lastName}, Welcome to qPay!`}
      />
      <div className="bg-tertiary p-2 mt-2 w-50 text-white br-3 flex flex-col gap-1 uppercase">
        <div className="flex justify-between">
          <h1 className="text-md">Account Number</h1>
          <h1 className="text-md">{user._id}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Balance</h1>
          <h1 className="text-md"> ₹ {user.balance || 0}</h1>
        </div>
      </div>
      <div className="card p-2 mt-2 w-50 br-3 flex flex-col gap-1 uppercase">
        <div className="flex justify-between">
          <h1 className="text-md">First Name</h1>
          <h1 className="text-md">{user.firstName}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Last Name</h1>
          <h1 className="text-md">{user.lastName}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Email</h1>
          <h1 className="text-md">{user.email}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Mobile</h1>
          <h1 className="text-md">{user.mobileNumber}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Identification Type</h1>
          <h1 className="text-md">{user.identificationType}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Identification Number</h1>
          <h1 className="text-md">{user.identificationNumber}</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
