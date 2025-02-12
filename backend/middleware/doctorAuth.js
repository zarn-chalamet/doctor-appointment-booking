const jwt = require("jsonwebtoken");

//admin authentication middleware
const doctorAuth = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again doctor",
      });
    }
    console.log("dtoken");
    console.log(dtoken);

    const token_decode = jwt.verify(dtoken, process.env.ACCESS_TOKEN_SECRET);

    console.log(token_decode.id);
    if (token_decode.id) {
      req.body.docId = token_decode.id;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

module.exports = doctorAuth;
