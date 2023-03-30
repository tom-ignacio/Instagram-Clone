import { NextFunction, Request, Response } from "express";
import Post, { I_Post } from "../models/post";
import Follow, { I_Follow } from "../models/follow";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const newPost = async (req: Request, res: Response) => {
  if (!req.body.picture) {
    return res.status(400).json({ msg: "Some fields are invalid." });
  } else {
    const newPost = new Post(req.body);
    await newPost.save();
    return res.status(201).json(newPost);
  }
};

export const getAllPosts = async (req: Request, res: Response) => { //UNTESTED
  const Posts = await Post.find().sort({create_date: 1});
  res.json(Posts);
};

export const getPostById = async (req: Request, res: Response) => { //UNTESTED
  const { postId } = req.params;
  const post = await Post.findById(postId);
  res.status(200).json(post);
};

export const getPostsByUser = async (req: Request, res: Response) => { //UNTESTED
  const posts = await Post.find({owner: req.params.owner}).sort({create_date: 1});
  return res.json(posts);
};

export const showFeed = async (req: Request, res: Response): Promise<Response>=>{ //UNTESTED

  const busqueda = await Follow.find({username:req.body.username})
  let result:any = []
  
  for (let i = 0; i < busqueda.length; i++) {
    const posts = await Post.find({owner:busqueda[i].follower})
    result = result.concat(posts)
  }

  let allPosts = result.sort(function(a:any, b:any) {
      return new Date(b.create_date).getTime() - new Date(a.create_date).getTime();
  });
  
  return res.status(200).json({allPosts})
};

export const deletePost = async (req: Request, res: Response) => {//UNTESTED
  const deletedPost = await Post.findByIdAndUpdate({deleted: true}, { new: true, });
  res.status(200).json(deletedPost);
};
