const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  label: {
    type: String,
  },
  labelText:{
    type:String
  },
  priority:{
    type:String
  },
  members: [
    {
      _id: false,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  checklist: [
    {
      text: {
        type: String,
      },
      complete: {
        type: Boolean,
      },
    },
  ],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
  comments: [
    {
      text: {
        type: String,
      },
      name:{
       type:String
      },
      user_id:{ 
        type: Schema.Types.ObjectId,
        ref: 'users',
      }
    }
  ]
});

module.exports = Card = model('card', CardSchema);
