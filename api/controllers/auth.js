const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../database");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

const test = (req, res) => {
  res.json("test oke");
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.status(201).json(userDoc);
  } catch (err) {
    res.status(422).json(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .status(200)
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
            })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(404).json("not found");
    next(err);
  }
};

const profile = (req, res) => {
  const token = req.headers.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const { name, email, _id } = await User.findById(userData.id);

      res.status(200).json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "")
    .json({ message: "Logged out successfully" });
};

module.exports = {
  test,
  register,
  login,
  profile,
  logout,
};
