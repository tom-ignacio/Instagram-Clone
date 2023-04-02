import { NextFunction, Request, Response } from "express";
import Comment, { I_Comment } from "../models/comment";

export const newComment = async (req: Request, res: Response) => {
  if (!req.body.description) {
    return res.status(400).json({ msg: "Some fields are invalid." });
  } else {
    const newComment = new Comment(req.body);
    await newComment.save();
    return res.status(201).json(newComment);
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  const comments = await Comment.find({post_id: req.params.post_id, deleted: false}).sort({create_date: -1});
  return res.json(comments);
};

export const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const deletedComment = await Comment.findOneAndUpdate({_id: commentId}, {deleted: true}, { new: true, });
  res.status(200).json(deletedComment);
};
