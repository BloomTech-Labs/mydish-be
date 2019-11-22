const router = require('express').Router();
const Recipes = require('../data/recipeModel.js');
const Edits = require('../data/editsModel.js');

//all edits by ancestor recipe id, only grabs immediate children.
//future releases may require recursive db calls to find children of children.

router.get('/:id', (req, res) => {
    Edits.recipesByAncestorId(req.params.id)
    .then(dbRes => {
        res.status(201).json({
            message: 'Recipes found',
            data: dbRes
        })
    })
    .catch(err => {
        console.log(err);
        res.status(501).Json({
            message:"there was an error with your request",
            error: err
        });
    })
});

