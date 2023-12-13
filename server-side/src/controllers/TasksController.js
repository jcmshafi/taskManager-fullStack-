const TasksModel = require("../models/TasksModel");


//! Create Task
exports.createTask = (req, res) => {
    let reqBody = req.body;
    reqBody.email=req.headers['email'];
    TasksModel.create(reqBody)
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};

//! Delete Task
exports.deleteTask = (req, res) => {
    const id = req.params.id;
    // let Query = { _id: id };
    TasksModel.findByIdAndDelete(id)
        .then((data) => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch((err) => {
            res.status(400).json({ status: "fail", data: err });
        });
};

//! Update Task
exports.updateTaskStatus = (req, res) => {
    const id = req.params.id;
    let status= req.params.status;
    let Query = { _id: id };
    let reqBody={status:status}
    TasksModel.updateOne(Query, reqBody)
        .then((data) => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch((err) => {
            res.status(400).json({ status: "fail", data: err });
        });
};

//! Task List Select By Task Status
exports.listTaskByStatus=(req,res)=>{
    let status= req.params.status;
    let email=req.headers['email'];
    TasksModel.aggregate([
        {$match:{status:status,email:email}},
        {$project:{
                _id:1,title:1,description:1, status:1,
                createdDate:{
                    $dateToString:{
                        date:"$createdDate",
                        format:"%d-%m-%Y"
                    }
                }
            }}
    ])
    .then((data) => {
        res.status(200).json({ status: "success", data: data });
    })
    .catch((err) => {
        res.status(400).json({ status: "fail", data: err });
    });
}


//! Task Status Count
exports.taskStatusCount=(req,res)=>{
    let email=req.headers['email'];
    TasksModel.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status",sum:{$count: {}}}}
    ])
    .then((data) => {
        res.status(200).json({ status: "success", data: data });
    })
    .catch((err) => {
        res.status(400).json({ status: "fail", data: err });
    });
}
