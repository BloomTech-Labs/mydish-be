const router = require("express").Router();
const model = require("../models/tags");

//add a tag
router.post(`/tags`, async (req, res) => {
  const { name } = req.body;
  try {
    const new_tag = await model.add_one({ name });
    res.status(200).json(new_tag);
  } catch (err) {
    console.log("whoops", err);
    res.status(500).json(err.detail);
  }
});

//get one tag
router.get(`/tags/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await model.get_one({ id });
    tag ? res.status(200).json(tag) : res.status(404).json("No tag found.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//get all tags
router.get(`/tags`, async (req, res) => {
  try {
    const tags = await model.get_all();
    tags.length > 0
      ? res.status(200).json(tags)
      : res.status(404).json("No tags found.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//update a tag
router.put(`/tags/:id`, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const tag = await model.update_one(id, updates);
    tag
      ? res.status(200).json(tag)
      : res.status(404).json(`Couldn't update tag`);
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//terminate a tag
router.delete(`/tags/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await model.remove_one(id);
    tag
      ? res.status(200).json(`${tag.id} has been terminated.`)
      : res.status(404).json(`Couldn't find tag ${id}.`);
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//terminate all tags
router.delete(`/tags`, async (req, res) => {
  try {
    await model.remove_all();
    res.status(200).json("All tags have been eliminated.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

module.exports = router;
