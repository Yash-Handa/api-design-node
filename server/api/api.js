var router = require('express').Router();

const category = require('./category/categoryRoutes');
const post = require('./post/postRoutes');
const user = require('./user/userRoutes');

// api router will mount other routers
// for all our resources. Each resource directory
// has a resourceRoutes.js file with the router ready to go,
// require them and mount them to their respective routes below

router.use('/users', user);
router.use('/categories', category);
router.use('/posts', post);

module.exports = router;
