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
router.get("/:oid", getTodoById);
router.put("/:oid", updateTodoById);
router.delete("/:oid", deleteTodoById);

module.exports = router;
