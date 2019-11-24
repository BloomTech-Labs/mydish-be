const router = require('express').Router();
const Edits = require('../data/editsModel.js');

//all edits by ancestor recipe id, only grabs immediate children.
//future releases may require recursive db calls to find children of children.
//i have this under a /dev/ because i am testing it out. until it's working just use /:id
router.get('/:id', (req, res) => {
    Edits.searchByAncestor(req.params.id)
    .then(dbRes => {
        res.status(201).json({ recipes: dbRes });
    })
    .catch(err => {
        console.log(err);
        res.status(501).Json({
            message:"there was an error with your request",
            error: err
        });
    })
});

// //all edits by ancestor recipe id, only grabs immediate children, only returns an array of child recipe I.
// router.get('/test/:id', (req, res) => {
//     Edits.findAllByAncestorId(req.params.id)
//     .then(dbRes => {
//         res.status(201).json({
//             message: 'Recipes found',
//             data: dbRes
//         })
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(501).Json({
//             message:"there was an error with your request",
//             error: err
//         });
//     })
// })
module.exports = router;