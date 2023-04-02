import { NextFunction, Request, Response } from "express";
import Follow, { I_Follow } from "../models/follow";

export const followUser = async (req: Request, res: Response) => {
  const newFollow = new Follow(req.body);
  await newFollow.save();
  return res.status(201).json(newFollow);
};

export const unfollowUser = async (req: Request, res: Response) => {
  const Unfollow = await Follow.findOneAndDelete({follower: req.params.follower, following: req.params.following});
  res.status(200).json();
};

export const countFollower = async (req: Request, res: Response) => {
  const followers = await Follow.countDocuments({following: req.params.following});
  return res.json(followers);
};

export const countFollowing = async (req: Request, res: Response) => {
  const following = await Follow.countDocuments({follower: req.params.follower});
  return res.json(following);
};