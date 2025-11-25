import { Router } from "express";
import express from "express";
import { getLists, createList } from "../controller/listController.js";
const router = Router();


router.get("/lists", getLists);
router.post("/lists", createList);



export default router;