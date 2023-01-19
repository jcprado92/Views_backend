const db = require("../db/dbConfig.js");

//INDEX ROUTE
const getAllPics = async () => {
  try {
    const allPics = await db.any("SELECT * FROM pics");
    return allPics;
  } catch (err) {
    return err;
  }
};

//SHOW ROUTE
const getPic = async (id) => {
  try {
    const onePic = await db.one("SELECT * FROM pics WHERE id=$1", id);
    return onePic;
  } catch (err) {
    return err;
  }
};

//CREATE ROUTE
const createPic = async (pic) => {
  let { name, url, location, is_favorite } = pic;

  let lowercasedName = name.toLowerCase().split(" ")
  let picName = lowercasedName.map((word) => {
    if(word.length > 2){
      return word.charAt(0).toUpperCase() + word.substring(1)
    } else {
      return word
    }
  }).join(" ");

  let lowercasedLocation = location.toLowerCase().split(" ")
  let picLocation = lowercasedLocation.map((word) => {
    if(word.length > 2){
      return word.charAt(0).toUpperCase() + word.substring(1)
    } else {
      return word
    }
  }).join(" ");
  
  if(!url){
    url = "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
  }
//create helper function 
  try {
    const newPic = await db.one(
      "INSERT INTO pics (name, url, location, is_favorite) VALUES ($1, $2, $3, $4) RETURNING *",
      [picName, url, picLocation, is_favorite]
    );
    return newPic;
  } catch (err) {
    return err;
  }
};

//UPDATE ROUTE
const updatePic = async (pic, id) => {
  let { name, url, location, is_favorite } = pic;

  let lowercasedName = name.toLowerCase().split(" ")
  let picName = lowercasedName.map((word) => {
    if(word.length > 2){
      return word.charAt(0).toUpperCase() + word.substring(1)
    } else {
      return word
    }
  }).join(" ");

  let lowercasedLocation = location.toLowerCase().split(" ")
  let picLocation = lowercasedLocation.map((word) => {
    if(word.length > 2){
      return word.charAt(0).toUpperCase() + word.substring(1)
    } else {
      return word
    }
  }).join(" ");
  
  if(!url){
    url = "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
  }

  try {
    const updatedPic = await db.one(
      "UPDATE pics SET name=$1, url=$2, location=$3, is_favorite=$4 WHERE id=$5 RETURNING *",
      [picName, url, picLocation, is_favorite, id]
    );
    return updatedPic;
  } catch (err) {
    return err;
  }
};

//DELETE ROUTE
const deletePic = async (id) => {
  try {
    const deletedPic = await db.one(
      "DELETE FROM pics WHERE id=$1 RETURNING *",
      id
    );
    return deletedPic;
  } catch (err) {
    return err;
  }
};

module.exports = { getAllPics, getPic, createPic, updatePic, deletePic };
