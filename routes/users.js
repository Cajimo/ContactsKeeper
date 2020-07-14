//! Register route
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST  api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Por favor, agregue un nombre').not().isEmpty(),
    check('email', 'Por favor, incluya un email válido').isEmail(),
    check(
      'password',
      'Por favor, ingrese una clave con 6 o más caracteres'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
      }
      user = new User({
        /* name: name,
        email: email,
        password: password, */
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Error de Servidor');
    }
  }
);

// Have to export the router or won't work
module.exports = router;
