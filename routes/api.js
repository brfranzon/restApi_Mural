const express = require("express");
const router = express.Router();
const postModel = require("../model/post_model");


// Routes
// all posts
router.get("/get", (req, res) => {
    postModel.find().then(post => {
        res.json(post);
    })
})

// specific post
router.get("/get/:postID", (req, res) => {
    postModel.findById(req.params.postID).then(post => {
        res.json(post);
    })
})

// submit a post
router.post("/post", (req, res) => {
    const newPost = new postModel({
        title: req.body.title,
        descricao: req.body.descricao
    })

    newPost.save()
        .then(data => {
            res.json(data);
        })
})


router.delete("/delete/:postID", (req, res) => {
    postModel.remove({ _id: req.params.postID }).then(post => {
        res.json(post);
    })
})



// update
router.patch("/update/:postID", (req, res) => {

    postModel.updateOne({ _id: req.params.postID }, { $set: { title: req.body.title } }).then(post => {
        res.json(post);
    })

})
module.exports = router;

