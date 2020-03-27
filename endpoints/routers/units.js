const router = require("express").Router();
const model = require("../models/units");

//add a unit
router.post(`/units`, async (req, res) => {
  const {name, abbreviation, type} = req.body;
  try {
    const new_unit = await model.add_one({name, abbreviation, type});
    res.status(200).json(new_unit);
  } catch (err) {
    console.log("err", err);
    res.status(500).json(err.detail);
  }
});

//get one unit
router.get(`/units/:id`, async (req, res) => {
  const {id} = req.params;
  try {
    const unit = await model.get_one({id});
    unit ? res.status(200).json(unit) : res.status(404).json("No unit found.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//get all units
router.get(`/units`, async (req, res) => {
  try {
    const units = await model.get_all();
    units.length > 0
      ? res.status(200).json(units)
      : res.status(404).json("No units found.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//update a unit
router.put(`/units/:id`, async (req, res) => {
  const {id} = req.params;
  const updates = req.body;
  try {
    const unit = await model.update_one(id, updates);
    unit
      ? res.status(200).json(unit)
      : res.status(404).json(`Couldn't update unit`);
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//terminate a unit
router.delete(`/units/:id`, async (req, res) => {
  const {id} = req.params;
  try {
    const unit = await model.remove_one(id);
    unit
      ? res.status(200).json(`${unit.name} has been terminated.`)
      : res.status(404).json(`Couldn't find unit ${id}.`);
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//terminate all units
router.delete(`/units`, async (req, res) => {
  try {
    await model.remove_all();
    res.status(200).json("All units have been eliminated.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

module.exports = router;
