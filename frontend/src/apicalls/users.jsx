// import axios from "axios";
// const { axiosInstance } = require("./index");
import { message } from "antd";
import { axiosInstance } from "./index.jsx";

//login user

export const LoginUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/login", payload);
    return data;
    // const response = await axiosInstance.post("/api/users/login", payload);

    // localStorage.setItem("token", response.data.token);

    // // Force refresh to clear any cached user state
    // window.location.reload();
    // return response;
  } catch (error) {
    return error.response.data;
  }
};

//register user

export const RegisterUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/register", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//fetch/get user info

export const GetUserInfo = async () => {
  try {
    const { data } = await axiosInstance.post("/api/users/get-user-info");
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//get all users

export const GetAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/api/users/get-all-users");
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//update user verified status

export const UpdateUserVerifiedStatus = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/users/update-user-verified-status",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//request profile update

export const RequestProfileUpdate = async (payload) => {
  try {
    return {
      success: true,
      message: "Profile update request submitted successfully.",
    };
  } catch (error) {
    return error.response.data;
  }
};

//Profile Update =>  in progress
