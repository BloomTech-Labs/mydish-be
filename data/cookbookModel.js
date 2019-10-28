const db = require("./dbConfig.js");

module.exports = {
    cookbookInsert,
    cookbookRecipeDelete,
    cookbookFindBy
}

function cookbookFindBy(where) {
    return db("cooks").where(where);
  }

function cookbookInsert(recipeId, cookId) {
    return db("saves")
      .insert(recipeId, cookId);
  };
  
function cookbookRecipeDelete(recipeId) {
    return findBy({ recipeId }).del();
  };