// const { Schema, model } = require('mongoose');

// const CommentSchema = new Schema({
//     user_id:{
//         type:Schema.Types.ObjectId,
//         ref:"user"
//     },
//     board_id:{
//         type:Schema.Types.ObjectId,
//         ref:"board"
//     },
//     card_id:{
//         type:Schema.Types.ObjectId,
//         ref:"board"
//     }
// //   title: {
// //     type: String,
// //     required: true,
// //   },
// //   description: {
// //     type: String,
// //   },
// //   label: {
// //     type: String,
// //   },
// //   labelText:{
// //     type:String
// //   },
// //   priority:{
// //     type:String
// //   },
// //   members: [
// //     {
// //       _id: false,
// //       user: {
// //         type: Schema.Types.ObjectId,
// //         ref: 'users',
// //       },
// //       name: {
// //         type: String,
// //         required: true,
// //       },
// //     },
// //   ],
// //   checklist: [
// //     {
// //       text: {
// //         type: String,
// //       },
// //       complete: {
// //         type: Boolean,
// //       },
// //     },
// //   ],
// //   archived: {
// //     type: Boolean,
// //     required: true,
// //     default: false,
// //   },
// });

// module.exports = Card = model('comment', CommentSchema);