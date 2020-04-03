const router = require("express").Router();
const model = require("../models/instructions");

//add a instruction
router.post(`/instructions`, async (req, res) => {
  const {recipe_id, step_number, description} = req.body;
  try {
    const new_instruction = await model.add_one({
      recipe_id,
      step_number,
      description,
    });
    res.status(200).json(new_instruction);
  } catch (err) {
    console.log("whoops", err);
    res.status(500).json(err.detail);
  }
});

//get one instruction
router.get(`/instructions/:id`, async (req, res) => {
  const {id} = req.params;
  try {
    const instruction = await model.get_one({id});
    instruction
      ? res.status(200).json(instruction)
      : res.status(404).json("No instruction found.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//get all instructions
router.get(`/instructions`, async (req, res) => {
  try {
    const instructions = await model.get_all();
    instructions.length > 0
      ? res.status(200).json(instructions)
      : res.status(404).json("No instructions found.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//update a instruction
router.put(`/instructions/:id`, async (req, res) => {
  const {id} = req.params;
  const updates = req.body;
  try {
    const instruction = await model.update_one(id, updates);
    instruction
      ? res.status(200).json(instruction)
      : res.status(404).json(`Couldn't update instruction`);
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//terminate a instruction
router.delete(`/instructions/:id`, async (req, res) => {
  const {id} = req.params;
  try {
    const instruction = await model.remove_one(id);
    instruction
      ? res.status(200).json(`${instruction.id} has been terminated.`)
      : res.status(404).json(`Couldn't find instruction ${id}.`);
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

//terminate all instructions
router.delete(`/instructions`, async (req, res) => {
  try {
    await model.remove_all();
    res.status(200).json("All instructions have been eliminated.");
  } catch (err) {
    res.status(500).json(err.detail);
  }
});

module.exports = router;
