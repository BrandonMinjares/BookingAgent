const express = require('express');
const { authorize }  = require('../middleware/auth');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user');

//router.use(authorize('admin', 'user', 'paidUser'));

router
  .route('/')
  //.get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;