const express = require("express");
const router = express.Router();
const {
  getFullList,
  createTask,
  getTaskById,
  deleteTask,
  getTaskByUserId,
  updateTask,
} = require("../controllers/todoController");
const validateToken = require("../middleware/validateTokenHandler");

// router.get;
router
  .route("/")
  .get(validateToken, getFullList)
  .post(validateToken, createTask);

router.route("/user").get(validateToken, getTaskByUserId);

router
  .route("/:id")
  .get(validateToken, getTaskById)
  .put(validateToken, updateTask)
  .delete(validateToken, deleteTask);

module.exports = router;
