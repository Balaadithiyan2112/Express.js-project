const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");

const getFullList = asyncHandler(async (req, res) => {
  const todo = await Todo.find();
  res.status(200).json(todo);
});

//@desc Create new Task
//@route POST/api/task
//@access Public

const createTask = asyncHandler(async (req, res) => {
  console.log("The request body is : ", req.body);
  const { title, description, isFavourite, isCompleted, isDeleted, userId } =
    req.body;
  if (!title) {
    res.status(400);
    throw new Error("title is mandatory");
  } else if (!userId) {
    res.status(400);
    throw new Error("userId is mandatory");
  }
  try {
    const todo = await Todo.create({
      title,
      description,
      isFavourite,
      isCompleted,
      isDeleted,
      userId,
    });
    res.status(201).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error(err.message);
  }
});

const getTaskById = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404);
      throw new Error("Task not found");
    }
    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error(err.message);
  }
});

const getTaskByUserId = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  console.log("Give Userid", userId);
  try {
    const todo = await Todo.find({ userId });
    if (!todo) {
      res.status(404);
      throw new Error("Task not found");
    }
    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error(err.message);
  }
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404);
      throw new Error("Task not found");
    }
    const updateTask = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateTask);
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// const deleteTask = asyncHandler(async (req, res) => {
//   const todo = await Todo.findById(req.params.id);
//   console.log(todo);
//   try {
//     if (!todo) {
//       res.status(404);
//       throw new Error("Task not found");
//     }
//     await todo.remove();
//     res.status(200).json(todo);
//   } catch (err) {
//     console.log(err);
//     res.status(500);
//     // \begin{pre}
//     throw new Error(err.message);
//   }
// });

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404);
      throw new Error("Task not found");
    }

    await Todo.deleteOne({ _id: req.params.id });

    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error(err.message);
  }
});

module.exports = {
  getFullList,
  createTask,
  getTaskById,
  deleteTask,
  getTaskByUserId,
  updateTask,
};
