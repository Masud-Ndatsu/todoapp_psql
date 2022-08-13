const fs = require("fs");
const { User } = require("../models/");
const cloudinary = require("../config/cloudinary.config");
const {
  hashObject,
  verifyHash,
  generateToken,
} = require("../utils/encryption");

async function createUser(req, res) {
  try {
    const { body, file } = req;
    console.log(req.file);
    const { path } = file;
    const uploader = async (path) => await cloudinary.uploads(path, "Images");
    body.password = await hashObject(body.password);
    const imageUrl = await uploader(path);
    const newUser = await User.create({ ...body, imageUrl: imageUrl.url });
    fs.unlinkSync(path);
    return res.status(201).json({
      success: true,
      message: "User successfully created",
      payload: newUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
        payload: null,
      });
    }
    const accurateObject = user.password;
    const validPassword = await verifyHash({
      sentObject: password,
      accurateObject,
    });
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        payload: null,
      });
    }
    const tokenPayload = {
      oid: user.oid,
      email: user.email,
    };
    const token = await generateToken({
      payload: tokenPayload,
      expirationTime: "24h",
    });
    return res.status(200).json({
      success: true,
      message: "User found",
      payload: { user, token },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.findAll({ iniclude: ["posts"] });
    return res.status(200).json({
      success: true,
      message: "User successfully found",
      payload: users,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getUserById(req, res) {
  try {
    const { oid } = req.oid;
    const user = await User.findOne({ oid });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        payload: null,
      });
    return res.status(200).json({
      success: true,
      message: "User successfully found",
      payload: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function updateUserById(req, res) {
  try {
    const { oid } = req.params;
    const { body } = req;

    const user = await User.findOne({ oid });

    user.name = body.name;
    user.email = body.email;
    user.password = body.password;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User successfully updated",
      payload: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function deleteUserById(req, res) {
  try {
    const { oid } = req.params;
    const user = await User.findOne({ oid });

    await user.destroy();

    return res.status(200).json({
      success: true,
      message: "User successfully deleted",
      payload: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
