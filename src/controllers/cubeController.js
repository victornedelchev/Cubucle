const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require('../services/accessoryService');
const Accessory = require("../models/Accessory");

router.get("/create", (req, res) => {
  res.render("cube/create");
});

router.post("/create", async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    difficultyLevel,
  } = req.body;

  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user,
  });

  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const {
    cubeId
  } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();
 
  if (!cube) {
    res.render('404');
    return;
  }

  res.render("cube/details", {
    ...cube
  });
});

// Accessory attachment
router.get("/:cubeId/attach-accessory", async (req, res) => {
  const {
    cubeId
  } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();
  const accessoryId = cube.accessories 
  ? cube.accessories.map((a) => (a._id))
  : [];

  const accessories = await accessoryService.getWithoutOwned(accessoryId).lean();
  
  // view data, template data
  const hasAccessories = accessories.length > 0; 

  res.render('accessory/attach', {
    ...cube,
    accessories,
    hasAccessories
  });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
  const { cubeId } = req.params;
  const { accessory: accessoryId } = req.body;

  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/edit', (req, res) => {
  res.render('cube/edit');
});

router.get('/:cubeId/delete', (req, res) => {
  res.render('cube/delete');
});

module.exports = router;