import { Router } from "express";
import {
  signIn,
  signUp,
  findUser,
  deleteUser
} from "../controller/user.controller";
import passport from "passport";
import { 
  countFollower, 
  countFollowing, 
  followUser, 
  unfollowUser } from "../controller/follow.controller";
import { 
  getPostById, 
  getPostsByUser, 
  getAllPosts,
  showFeed, 
  newPost,
  deletePost} from "../controller/post.controller";
import { 
  deleteComment,
  getCommentsByPost, 
  newComment } from "../controller/comment.controller";


const router = Router();

// Login
router.post("/signup", signUp);
router.post("/signin", signIn);

// User
router.get('/finduser/:username', passport.authenticate('jwt', {session:false}), findUser)
router.put('/delete/:username', passport.authenticate('jwt', {session:false}), deleteUser)

// Post
router.post('/newpost', passport.authenticate('jwt', {session:false}), newPost)
router.get('/feed/:username', passport.authenticate('jwt', {session:false}), showFeed)
router.get('/posts/:owner', passport.authenticate('jwt', {session:false}), getPostsByUser)
router.get('/post/:postId', passport.authenticate('jwt', {session:false}), getPostById)
router.put('/post/:postId', passport.authenticate('jwt', {session:false}), deletePost)
router.get('/allposts', passport.authenticate('jwt', {session:false}), getAllPosts)


// Follow
router.post('/follow', passport.authenticate('jwt', {session:false}), followUser)
router.delete('/follow/:follower/:following', passport.authenticate('jwt', {session:false}), unfollowUser)
router.get('/follower/:following', passport.authenticate('jwt', {session:false}), countFollower)
router.get('/following/:follower', passport.authenticate('jwt', {session:false}), countFollowing)

// Comment
router.post('/newcomment', passport.authenticate('jwt', {session:false}), newComment)
router.get('/comments/:post_id', passport.authenticate('jwt', {session:false}), getCommentsByPost)
router.put('/comment/:commentId', passport.authenticate('jwt', {session:false}), deleteComment)

export default router;