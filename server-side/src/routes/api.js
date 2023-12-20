const express = require('express');
const router = express.Router();
const UsersController=require("../controllers/UsersController");
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");
const TasksController=require("../controllers/TasksController");


//API Routing End Point
router.post("/registration",UsersController.registration);
router.post("/login",UsersController.login);
router.post("/profileUpdate",AuthVerifyMiddleware,UsersController.profileUpdate);
router.get("/profileDetails",AuthVerifyMiddleware,UsersController.profileDetails);

router.get("/RecoverVerifyEmail/:email",UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass",UsersController.RecoverResetPass);

router.post("/createTask",AuthVerifyMiddleware,TasksController.createTask);
router.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware,TasksController.updateTaskStatus);
router.get("/deleteTask/:id",AuthVerifyMiddleware,TasksController.deleteTask);
router.get("/listTaskByStatus/:status",AuthVerifyMiddleware,TasksController.listTaskByStatus);
router.get("/taskStatusCount",AuthVerifyMiddleware,TasksController.taskStatusCount);





module.exports = router;