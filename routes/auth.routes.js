import express from "express";
import authentication from '../controllers/auth.controller';

const router = express.Router();

router.post('/signupuser',authentication.signUpRegistrationUser);
router.post('/login',authentication.login);

module.exports = router;