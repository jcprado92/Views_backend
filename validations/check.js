const validateName = (req, res, next) => {
  console.log("name is being checked");
  if (req.body.name) {
    console.log("we've got a name here!");
    next();
  } else {
    res.status(400).json({ error: "We need a name..." });
  }
};

// const validateUrl = (req, res, next) => {
//   if (
//     req.body.url.substring(0, 7) === "http://" ||
//     req.body.url.substring(0, 8) === "https://"
//   ) {
//     console.log("URL checks out!");
//     next();
//   } else {
//     res
//       .status(400)
//       .json({ error: "Your URL does not match 'http://' or 'https://' " });
//   }
// };

const validateLocation = (req, res, next) => {
  console.log("name is being checked");
  if (req.body.location) {
    console.log("we've got a location!");
    next();
  } else {
    res.status(400).json({ error: "We need a location..." });
  }
};

module.exports = { validateName, validateLocation };
