const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");

//transfer

router.post("/transfer-funds", authMiddleware, async (req, res) => {
  try {
    //saving the transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    //deduct the senders balance
    await User.findByIdAndUpdate(req.body.sender, {
      //inbuilt increment method
      $inc: { balance: -req.body.amount },
    });

    //credit the receivers balance
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balance: req.body.amount },
    });
    res.send({
      message: "Transaction successful",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
});

//verify receivers account number

router.post("/verify-account", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });
    if (user) {
      res.send({
        message: "Receiver account verified",
        data: user,
        success: true,
      });
    } else {
      res.send({
        message: "Receiver account not found",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Receiver account not found",
      data: error.message,
      success: false,
    });
  }
});

//get all transactions for a user

router.post(
  "/get-all-transactions-by-user",
  authMiddleware,
  async (req, res) => {
    try {
      const transactions = await Transaction.find({
        $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
      })
        .sort({ createdAt: -1 })
        .populate("sender")
        .populate("receiver");
      res.send({
        message: "Transactions fetched",
        data: transactions,
        success: true,
      });
    } catch (error) {
      res.send({
        message: "Transactions not fetched",
        data: error.message,
        success: false,
      });
    }
  }
);

//deposit funds using stripe

router.post("/deposit-funds", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    //Ensure minimum amount of ₹50
    if (amount < 50) {
      return res.send({
        message: "Minimum deposit amount is ₹50.00",
        success: false,
      });
    }

    //create a customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const amountInPaise = amount * 100;
    //create a charge

    const charge = await stripe.charges.create(
      {
        amount: amountInPaise, //convert INR to paise
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
        description: "Deposited to qPay",
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (charge.status === "succeeded") {
      const newTransaction = new Transaction({
        sender: req.body.userId,
        receiver: req.body.userId,
        amount: amount, //store actual INR amount
        type: "Deposit",
        reference: "stripe deposit",
        status: "success",
      });
      await newTransaction.save();
      await User.findByIdAndUpdate(req.body.userId, {
        $inc: { balance: amount },
      });
      res.send({
        message: "Transaction successful",
        data: newTransaction,
        success: true,
      });
    } else {
      res.send({
        message: "Transaction Failed",
        data: charge,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Transaction Failed",
      data: error.message,
      success: false,
    });
  }
});

module.exports = router;
