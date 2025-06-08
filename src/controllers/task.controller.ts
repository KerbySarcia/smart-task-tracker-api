import { Request, Response } from "express";
import Task from "../models/task.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const taskDetails = res.locals.validatedBody;

    const userId = res.locals.userId;

    const task = await Task.create({ ...taskDetails, user: userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const queries = res.locals.validatedQueries;

    const page = queries.page || 1;

    const limit = queries.limit || 10;

    const skip = (page - 1) * limit;

    const search: { title?: object; completed?: boolean; priority?: string } = {};

    if (queries.title) {
      search.title = { $regex: queries.title, $options: "i" };
    }

    if (queries.completed) {
      search.completed = queries.completed;
    }

    if (queries.priority) {
      search.priority = queries.priority;
    }

    const [data, totalItems] = await Promise.all([
      Task.find(search).skip(skip).limit(limit).lean(),
      Task.countDocuments(queries),
    ]);

    res.status(200).json({
      items: data,
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      limit,
      hasNext: page < Math.ceil(totalItems / limit),
      hasPrev: page > 1,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = res.locals.validatedParams.id;

    const taskDetails = res.locals.validatedBody;

    const updatedTask = await Task.findByIdAndUpdate(taskId, taskDetails, { new: true });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = res.locals.validatedParams.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ error });
  }
};
