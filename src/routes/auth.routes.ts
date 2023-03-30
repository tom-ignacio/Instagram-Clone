import { Router } from "express";
import {
  signIn,
  signUp,
  findUser,
  deleteUser
} from "../controller/user.controller";
import passport from "passport";


const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

router.get('/finduser/:username', passport.authenticate('jwt', {session:false}), findUser)
router.put('/delete/:username', passport.authenticate('jwt', {session:false}), deleteUser)

export default router;