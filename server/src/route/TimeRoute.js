// import express from 'express';
// import  createTimer from "./controller/TaskController.js"
// s
// const router = express.Router();

// router.post('/create', createTimer);


// // router.put('/update/:timerId', updateTimer);

// export default router;
import express from "express"
import { createTimer, getTimerByStore, updateTimer } from "../controller/TaskController.js"

const router = express.Router()

router.post("/create",createTimer)
router.put('/update/:timerId', updateTimer);
router.get('/get', getTimerByStore);

export  default router