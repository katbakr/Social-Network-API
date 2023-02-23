const router = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    createFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser);

router.route('/:id/friends/:friendsId').post(createFriend).delete(deleteFriend);

module.exports = router