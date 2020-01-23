const router = require("express").Router();
const model = require("../models/previous_versions");
const validate = require("../middleware/validate");

router.get("/recipes/:id/versions", async (req, res) => {
  try {
    const { id } = req.params;
    const versions = await model.get_all_versions(id);

    if (!versions.length) {
      res
        .status(400)
        .json({ message: `You don't have any other versions, yet.` });
    } else {
      res.status(200).json(versions);
    }
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

router.get("/recipes/:id/version/:rev_id", async (req, res) => {
  try {
    const { id, rev_id } = req.params;
    const version = await model.get_version_by_id(id, rev_id);

    if (!version) {
      res
        .status(400)
        .json({ message: `You don't have a version that matches this id.` });
    } else {
      res.status(200).json(version);
    }
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

router.get("/recipes/:id/versions/:rev_num", async (req, res) => {
  try {
    const { id, rev_num } = req.params;
    const version = await model.get_version_by_num(id, rev_num);

    if (!version) {
      res.status(400).json({
        message: `You don't have a version that matches this version number.`
      });
    } else {
      res.status(200).json(version);
    }
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

module.exports = router;
