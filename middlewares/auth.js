const { decodeToken } = require("../utils/encryption");
async function verifyUserToken(req, res, next) {
  try {
    let bearerToken;
    if (req.headers.authorization) {
      [, bearerToken] = req.headers.authorization.split(" ");
    }
    if (!bearerToken) {
      return res.status(401).json({
        success: false,
        message: "Kindly provide Bearer token",
        payload: null,
      });
    }
    const decoded = await decodeToken(bearerToken);

    // Append the parameters to the req object
    req.oid = decoded.oid;
    req.role = decoded.role;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: error.message, payload: null });
  }
}

module.exports = { verifyUserToken };
