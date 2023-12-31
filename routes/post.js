const router = require('express').Router()

// import our  post controller
const postController = require('../controllers/post')
// import protect middleware 
const protect = require('../middleware/authMiddleware')

//localhost:3000/
router.route('/').get(protect,postController.getAllPosts).post(protect,postController.createPost)

router
    .route('/:id')
    .get(protect,postController.getOnePost)
    .patch(protect,postController.updatePost)
    .delete(protect,postController.deletePost)

module.exports = router ;