const db = require("../models");
const bcrypt = require("bcryptjs");

const User = db.user;

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).send({ message: "Email already exists." });

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).send({ message: "User registered successfully.", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send({ message: "User not found." });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ message: "Invalid password." });

    res.status(200).send({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
