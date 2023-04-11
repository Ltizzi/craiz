const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const apiRouter = require("./routes/api.router");

const {
  config,
  AUTH_OPTIONS,
  checkLoggedIn,
  checkIsAdmin,
  verifyCallback,
  setupPassport,
} = require("./services/security");

const passport = require("passport");
const session = require("express-session");
const { sessionStore } = require("./services/mongo");

const { getUserByGoogleId } = require("./models/users/users.model");
const { Session } = require("express-session");

require("dotenv").config();

const app = express();

//production
// app.set("trust proxy", 1);

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://craze-test.web.app",
      "https://accounts.google.com",
    ],
    //   exposedHeaders: ["set-cookie"],
    credentials: true,
  })
);

setupPassport();

app.use(
  session({
    secret: [config.SECRET_KEY_1, config.SECRET_KEY_2],
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    // cookie: {
    //   sameSite: "none",
    //   secure: true,
    //   rolling: true,
    //   proxy: true,
    // },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("combined"));

app.use(express.json());

app.use("/v1", apiRouter);

//auth endpoints
app.get(
  "/v1/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/v1/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/success",
    session: true,
  }),
  (req, res) => {
    req.login(req.passport.email, (err) => {
      if (err) return next(err);
    });
  }
);

app.get("/v1/auth/logincheck", checkLoggedIn, async (req, res) => {
  try {
    const user = await getUserByGoogleId(req.user.googleId);
    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// const WEB_URL = "https://craze-test.web.app/";
const WEB_URL = "http://localhost:5173/";

app.get("/success", async (req, res) => {
  console.log("Current user is:....", req.user);
  const user = await getUserByGoogleId(req.user.googleId);
  // // Call the login function from Passport
  req.login(req.user, (err) => {
    if (err) {
      console.log(err);
    }

    if (!user.username || user.username == user.googleId) {
      res.redirect(`${WEB_URL}callback`);
    } else {
      console.log(user.username);
      res.redirect(`${WEB_URL}`);
    }
  });
});

app.get("/failure", (req, res) => {
  res.redirect(`${WEB_URL}logfail`);
});

app.get("/v1/logout", checkLoggedIn, (req, res) => {
  try {
    console.log("Deslogueando...");
    req.logout((err) => {
      console.log(err);
    });
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

module.exports = app;
