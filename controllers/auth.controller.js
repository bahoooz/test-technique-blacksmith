const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    firstname === "" ||
    lastname === "" ||
    email === "" ||
    password === ""
  ) {
    res.status(400).json({ message: "Tous les champs sont requis" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "Inscription réussie" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Echec de création du compte", error: error.message });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.status(404).json({ message: "Utilisateur introuvable" });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      res.status(400).json({ message: "Mot de passe incorrect" });
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    console.log(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur lors de la récupération de l'utilisateur",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "L'utilisateur a été supprimé" });
  } catch (error) {
    console.error(error);
  }
};
