const db = require("./dbConfig.js");

module.exports = {
    cookbookInsert,
    cookbookRecipeDelete,
    cookbookFindBy
}

function cookbookFindBy(any) {
    return db("saves").where(any);
  }

function cookbookInsert(recipeId, cookId) {
    return db("saves")
      .insert(recipeId, cookId);
  };
  
function cookbookRecipeDelete(recipeId) {
    return findBy({ recipeId }).del();
  };