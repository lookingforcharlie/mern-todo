import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: String,
  completed: Boolean,
});

const TodoModel = mongoose.model('Todo', TodoSchema);

export default TodoModel;

// example for disable '__V' from stackoverflow.com
// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema(
//     {
//         name: {
//             type: String,
//             require: true
//         },
//         email: {
//             type: String,
//             unique: true
//         },

//         password: {
//             type: String,
//         }
//     },
//     {
//         timestamps: true,
//         versionKey: false, // Here You have to add.
//     }
// )

// module.exports = mongoose.model('tbl_user', userSchema)
