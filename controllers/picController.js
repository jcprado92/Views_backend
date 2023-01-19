const express = require("express");
const pics = express.Router();
const {
  getAllPics,
  getPic,
  createPic,
  updatePic,
  deletePic,
} = require("../queries/pics.js");

const { validateName, validateLocation } = require("../validations/check.js");

// INDEX
pics.get("/", async (req, res) => {
  const allPics = await getAllPics();
  if (allPics[0]) {
    res.status(200).json({ payload: allPics, success: true });
  } else {
    res.status(500).json({ error: "server error" });
  }
});

//SHOW
pics.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pic = await getPic(id);
  if (pic.id) {
    res.json({ payload: pic, success: true });
  } else {
    res
      .status(404)
      .json({ payload: "not found", success: false, error: "Pic not found" });
  }
});

//CREATE
pics.post("/", validateName, validateLocation, async (req, res) => {
  try {
    const createdPic = await createPic(req.body);
    if (createdPic.id) {
      res.status(200).json({ payload: createdPic, success: true });
    } else {
      res.status(422).json({ payload: "Could not create Pic", success: false });
    }
  } catch (err) {
    console.log(err);
  }
});

//UPDATE
pics.put("/:id", validateName, validateLocation, async (req, res) => {
  const { id } = req.params;

  const updatedPic = await updatePic(req.body, id);
  if (updatedPic.id) {
    res.status(200).json(updatedPic);
  } else {
    res.status(404).json({ error: "Pic not found" });
  }
});

//DELETE
pics.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPic = await deletePic(id);
  if (deletedPic.id) {
    res.status(200).json({ payload: deletedPic, success: true });
  } else {
    res.status(404).json({ payload: "Not found", success: false });
  }
});

module.exports = pics;
