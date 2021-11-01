const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const Students = require("../models/student");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");

const client = new OAuth2Client(
  "345626656367-poa5188tsnn1itv6uqbssonceii8pik9.apps.googleusercontent.com"
);

const secret = "ASCCI";

const googleLogin = (req, res) => {
  const { tokenId } = req.body;
  const { image } = req.query;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "345626656367-poa5188tsnn1itv6uqbssonceii8pik9.apps.googleusercontent.com",
    })
    .then(async (response) => {
      const { email, email_verified } = response.payload;

      if (email_verified) {
        Students.findOne({ email }).exec(async (err, user) => {
          if (err) {
            return res.status(400).json({ error: "Something went wrong..." });
          } else {
            if (user) {
              const token = jwt.sign(
                {
                  user: user._id,
                },
                secret
              );

              res
                .cookie("token", token, {
                  httpOnly: true,
                  secure: true,
                  sameSite: "none",
                  maxAge: 12 * 60 * 60 * 1000,
                })

                .send();
            } else {
              const newUser = new Students({
                email,
                password: email,
                role: "Student",
                image: image,
              });

              const savedUser = await newUser.save();

              const token = jwt.sign(
                {
                  user: savedUser._id,
                },
                secret
              );
              res
                .cookie("token", token, {
                  httpOnly: true,
                  secure: true,
                  sameSite: "none",
                  maxAge: 12 * 60 * 60 * 1000,
                })
                .send();
            }
          }
        });
      }
    });
};

const loggedIn = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("Err", err.message);
      } else {
        let user =
          (await Users.findById(decodedToken.user)) ||
          (await Students.findById(decodedToken.user));
        const { firstName, lastName, email, role, image, picture } = user;
        res.json({ firstName, lastName, email, picture, image, role });
      }
    });
  } catch (error) {
    res.json(false);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await Users.findOne({ email });
    if (!existingUser)
      return res
        .status(401)
        .json({ errorMessage: "The entered email or password is incorrect." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res
        .status(401)
        .json({ errorMessage: "The entered email or password is incorrect." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      secret
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 12 * 60 * 60 * 1000,
      })

      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const requestReset = async (req, res) => {
  const { email } = req.body;

  const existingUser = await Users.findOne({ email: email });

  if (!existingUser)
    return res
      .status(401)
      .json({ errorMessage: "The entered email does not exist." });

  res.json(existingUser);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "asccifacilitator@gmail.com", // generated ethereal user
      pass: "ascci123", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: "asccifacilitator@gmail.com", // sender address
    to: email, // list of receivers
    subject: "ASCCI", // Subject line
    html: `<h2>Reset Password</h2>
    <hr />
    <p>Hello! We have received a request to reset the password of your account.<p>
     <p>You can reset your password by clicking this <a href="https://ascci-webapp.netlify.app/reset/${existingUser._id}">link</a><p><br />
       
       <p>If the above method doesn't work, you can simply copy the URL below and paste it in your browser.</p>
    <p>Link : <u>https://ascci-webapp.netlify.app/reset/${existingUser._id}</u><p><br />
      
    <p>We would like to thank you for using the application.</p>
    <p>Regards,</p>
    <p>ASCCI Team</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

const resetPassword = async (req, res) => {
  const { id } = req.params;

  const { newPass, verifyPass } = req.body;

  if (newPass !== verifyPass)
    return res.status(401).json({ errorMessage: "Passwords do not match." });
  if (newPass.length < 8)
    return res
      .status(401)
      .json({ errorMessage: "Password should be atleast 8 characters." });

  const salt = await bcrypt.genSalt();

  const passwordHashed = await bcrypt.hash(newPass, salt);

  const setPassword = { password: passwordHashed };

  const updatedPass = await Users.findByIdAndUpdate(id, setPassword, {
    new: true,
  });

  res.json(updatedPass);
};

const logoutAccount = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    })
    .send();
};

module.exports = {
  googleLogin,
  loggedIn,
  login,
  requestReset,
  resetPassword,
  logoutAccount,
};
