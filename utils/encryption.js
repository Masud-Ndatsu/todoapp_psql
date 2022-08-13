const bcrypt = require("bcrypt");
const { promisify } = require("util");
const { sign, verify } = require("jsonwebtoken");
const { genSalt, hash, compare } = bcrypt;
const { SALT, SIGNATURE } = process.env;

async function hashObject(objectToHash) {
  const salt = await genSalt(Number(SALT));
  const hashedObject = await hash(objectToHash, salt);
  return hashedObject;
}

async function verifyHash({ sentObject, accurateObject }) {
  const bool = await compare(sentObject, accurateObject);
  return bool;
}
const signJWT = promisify(sign);

async function generateToken({ payload, expirationTime = "1h" }) {
  const token = await signJWT(payload, `${SIGNATURE}`, {
    expiresIn: expirationTime,
  });
  return token;
}

const verifyJWT = promisify(verify);

async function decodeToken(token) {
  const bool = await verifyJWT(token, SIGNATURE);
  return bool;
}

module.exports = { hashObject, verifyHash, generateToken, decodeToken };
// building an adapter or a wrapper around this external dependencies
