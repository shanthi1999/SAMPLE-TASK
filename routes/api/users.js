const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const User = require('../../models/User');

// Register user
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log("comming here....",req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password,type } = req.body;

    console.log("req.body",req.body)
    try {
      // See if user exists
      if (await User.findOne({ email })) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }



      // Register new user
      const reqObj = await {
        name,
        email,
        password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
        type
      }
      console.log("reqObj",reqObj)

      const user = new User({
        name,
        email,
        // avatar: gravatar.url(email, { s: '200', r: 'pg', d: 'mm' }),
        password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
        type
      });
       
      
      console.log("before save",user)
      await user.save();
      console.log("after save")


      // Return jsonwebtoken
      jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      console.log("after jwt")

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get users with email regex
router.get('/:input', auth, async (req, res) => {
  try {
    const regex = new RegExp(req.params.input, 'i');
    const users = await User.find({
      email: regex,
    }).select('-password');

    res.json(users.filter((user) => user.id !== req.user.id));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
