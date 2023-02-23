const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            // required: true,
            unique: [true, 'That username is taken!'],
            trim: true
        },
        email: {
            type: String,
            // required: true,
            unique: [true, 'That email has already been used!'],
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'This is not a valid email address!'
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    },
);
const User = model('User', userSchema);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = User;