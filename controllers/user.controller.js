const mongoose = require("mongoose");
const { User } = require("../models/user");

async function createUser(req, res) {
  try {
    const { body } = req;
    const newUser = new User({ ...body });
    const result = await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User successfully created",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getUsers(req, res) {
  try {
    const result = await User.find({});
    return res.status(200).json({
      success: true,
      message: "User successfully found",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const oid = mongoose.Types.ObjectId(id);
    const result = await User.find({ _id: oid });
    if (!result.length)
      return res.status(404).json({
        success: false,
        message: "User not found",
        payload: result,
      });
    return res.status(200).json({
      success: true,
      message: "User successfully found",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const oid = mongoose.Types.ObjectId(id);
    const result = await User.updateOne({ _id: oid }, { ...body });
    return res.status(200).json({
      success: true,
      message: "User successfully updated",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const oid = mongoose.Types.ObjectId(id);
    const result = await User.deleteOne({ _id: oid });
    return res.status(200).json({
      success: true,
      message: "User successfully deleted",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
