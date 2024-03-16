import todoModel from "../model/todoModel.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description, type, date } = req.body;
    const query = new RegExp(title);
    const existTask = await todoModel.findOne({ title: title });
    if (existTask) {
      return res
        .status(200)
        .json({ existTask, message: "Task already in pending." });
    } else {
      const todo = new todoModel({
        title,
        description,
        type,
        date,
        userId: req.headers.userId,
      });
      const saved = await todo.save();
      if (saved) {
        return res
          .status(200)
          .json({ todoCreated: true, message: "New task added." });
      }
    }
  } catch (error) {}
};

//--------------------------------------------- Get todo ----------------------------------------//

export const getTodoList = async (req, res, next) => {
  try {
    const todoList = await todoModel.find({ userId: req.headers.userId });
    if (todoList) {
      return res.status(200).json(todoList);
    } else {
      return res.status(200).json({ todoList, message: "Network error.." });
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------Get todo ----------------------------------------//

export const getTodoDetails = async (req, res, next) => {
  try {
    const todo = await todoModel.findOne({ _id: req.params.todoId });
    if (todo) {
      return res.status(200).json(todo);
    } else {
      return res.status(200).json({ todo, message: "Network error.." });
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------Delete todo ----------------------------------------//

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await todoModel.findOneAndDelete({ _id: req.params.todoId });
    if (todo) {
      return res.status(200).json(todo);
    } else {
      return res.status(200).json({ todo, message: "Network error.." });
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------Edit todo ----------------------------------------//

export const editTodo = async (req, res, next) => {
  try {
    let { id, description, type, date, title } = req.body;
    if (!date) {
      let newDate = new Date();
      let options = { timeZone: "Asia/Kolkata" };
      date = newDate.toLocaleDateString("en-US", options);
    }

    const todo = await todoModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          type: type,
          date: date,
        },
      }
    );
    if (todo) {
      return res.status(200).json(todo);
    } else {
      return res.status(200).json({ todo, message: "Network error.." });
    }
  } catch (error) {
    next(error);
  }
};
