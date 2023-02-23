const { Thought, User } = require('../models');

const thoughtController = {
    //Get all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //Get thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought with this id" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // createThought(req,res) {
    //     Thought.create(req.body)
    //         .then((dbThoughtData) => {
    //             return User.findByIdAndUpdate(
    //                 { _id: params.userId },
    //                 { $push: { thoughts: dbThoughtData._id } },
    //                 { new: true }
    //             )
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             res.status(400).json(err);
    //         });
    //},
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user with this id" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));

    },

    //Update thought    
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this ID!' });
                } else {
                    res.json(dbThoughtData);
                }
            })
            .catch((err) => res.json(err));
    },
    //Delete Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this ID!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    //=======================================================================================================================
    //Reactions
    //=======================================================================================================================
    //Create Reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res
                        .status(404)
                        .json({ message: "No thought with this ID!" });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },
    //Delete Reaction
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res
                        .status(404)
                        .json({ message: "No thought with this ID!" });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;