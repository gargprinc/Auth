const express = require('express');
const router = express.Router();

const {getUsers, getUserById,updateUser,deleteUser} = require('../controllers/userController');
const protect = require('../middlewares/auth');
const authorize = require('../middlewares/role')

//router.post('/login', login);

router.get('/',protect, authorize('admin','user'),getUsers);


router.get('/:id',protect,authorize('admin','user'),getUserById);
router.put('/:id',protect,authorize('admin','user'),updateUser);
router.delete('/:id',protect,authorize('admin'),deleteUser);



module.exports = router;