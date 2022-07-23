const router = require("express").Router();
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todo.controller");

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodoById);
router.delete("/:id", deleteTodoById);

module.exports = router;
