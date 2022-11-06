const router = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/users');
const celebrates = require('../middlewares/celebrates');

router.get('/me', getUser);

router.patch('/me', celebrates.updateUser, updateUser);

module.exports = router;
