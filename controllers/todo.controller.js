const mongoose = require("mongoose");
const { Todo } = require("../models/todo");

async function createTodo(req, res) {
  try {
    const { description, title, userId } = req.body;
    const oid = mongoose.Types.ObjectId(userId);
    const newTodo = new Todo({ description, title, userId: oid });
    const result = await newTodo.save();
    return res.status(201).json({
      success: true,
      message: "Todo successfully created",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getTodos(req, res) {
  try {
    const result = await Todo.find({});
    return res.status(200).json({
      success: true,
      message: "Todo successfully found",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function getTodoById(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const oid = mongoose.Types.ObjectId(id);
    const result = await Todo.find({ _id: oid });
    if (!result.length)
      return res.status(404).json({
        success: false,
        message: "Todo not found",
        payload: result,
      });
    return res.status(200).json({
      success: true,
      message: "Todo successfully found",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function updateTodoById(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const oid = mongoose.Types.ObjectId(id);
    const result = await Todo.updateOne({ _id: oid }, { ...body });
    return res.status(200).json({
      success: true,
      message: "Todo successfully updated",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

async function deleteTodoById(req, res) {
  try {
    const { id } = req.params;
    const oid = mongoose.Types.ObjectId(id);
    const result = await Todo.deleteOne({ _id: oid });
    return res.status(200).json({
      success: true,
      message: "Todo successfully updated",
      payload: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, payload: null });
  }
}

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
