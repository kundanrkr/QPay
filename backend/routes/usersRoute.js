const router = require("express").Router();
const User = require("../models/userModel");
const ProfileUpdateRequest = require("../models/profileUpdateRequest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
require("dotenv").config();

//register user account

router.post("/register", async (req, res) => {
  try {
    //check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created successfully",
      data: null,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

//Login user account

router.post("/login", async (req, res) => {
  try {
    //check if user exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }

    //check if user is verified
    if (!user.isVerified) {
      res.send({
        success: false,
        message: "User is not verified yet or has been suspended",
      });
    } else {
      //generate token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.send({
        message: "User logged in successfully",
        data: token,
        success: true,
      });
    }
  } catch (error) {
    res.send({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
});

router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = "";
    res.send({
      message: "User info fetched successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

//get all users

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      message: "Users fetched successfully",
      data: users,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

//update user verified status

router.post(
  "/update-user-verified-status",
  authMiddleware,
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.body.selectedUser, {
        isVerified: req.body.isVerified,
      });
      res.send({
        data: null,
        message: "User verification status updated successfully",
        success: true,
      });
    } catch (error) {
      res.send({
        data: error,
        message: error.message,
        success: false,
      });
    }
  }
);

//  Create a new profile update request
/*
router.post("/request-profile-update", authMiddleware, async (req, res) => {
  try {
    const { updatedData } = req.body;
    const userId = req.body.userId; // Extract user ID from the authenticated request

    const request = new ProfileUpdateRequest({
      userId,
      updatedData,
      status: "Pending",
    });

    await request.save();

    res.send({
      success: true,
      message: "Profile update request submitted successfully.",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//  Get all profile update requests (For Admin)
router.get("/profile-update-requests", authMiddleware, async (req, res) => {
  try {
    const requests = await ProfileUpdateRequest.find().populate(
      "userId",
      "firstName lastName email"
    );
    res.send({ success: true, data: requests });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//  Approve or Reject a Profile Update Request
router.post("/handle-profile-update", authMiddleware, async (req, res) => {
  try {
    const { requestId, status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid status" });
    }

    const request = await ProfileUpdateRequest.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .send({ success: false, message: "Request not found" });
    }

    request.status = status;
    await request.save();

    if (status === "Approved") {
      const User = require("../models/User");
      await User.findByIdAndUpdate(request.userId, request.updatedData);
    }

    res.send({
      success: true,
      message: `Profile update request ${status.toLowerCase()} successfully.`,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});
*/
// Profile update => in progrss

module.exports = router;
