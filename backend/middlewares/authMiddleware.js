const jwt = require("jsonwebtoken");

//decrypt token

module.exports = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};
