const { Thought, User } = require('../models');

const thoughtController = {
    //Get all thoughts
    getThoughts(req,res) {
        Thought.find({})
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //Get thought by ID
    getThoughtById(req,res) {
        Thought.findOne({ _id: req.params.id })
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
    createThought(req,res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findByIdAndUpdate(
                    req.body.userId,
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //Update thought    
    updateThought(req,res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((updatedThought) => {
                if (!updatedThought) {
                    return res.status(404).json({ message: 'No thought with this ID!' });
                } else {
                    res.json(updatedThought);
                }
            })
            .catch((err) => res.json(err));
    },
    //Delete Thought
    deleteThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json(err);
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //Create Reaction
    createReaction(req,res) {
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
    deleteReaction(req,res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } }
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