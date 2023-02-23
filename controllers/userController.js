const { Thought, User } = require('../models');

const userController = {
    // Get all users
    getUsers(req, res) {
        User.find({})
            // .populate('thoughts')
            // .populate('friends')
            .populate([
                {
                    path: 'thoughts',
                    select: '-__v'
                },
                {
                    path: 'friends',
                    select: '-__v'
                }
            ])
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Get User by ID
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Post a User
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json(err);
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
//============================================================================================================================
//Friends
//============================================================================================================================
    // Create/add a friend
    createFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json(err);
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
    // Delete/remove a friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }   
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json(err);
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
};

module.exports = userController;