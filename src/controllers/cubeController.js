const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require('../services/accessoryService');
const Accessory = require("../models/Accessory");
const { difficultyLevelOptionsViewData } = require('../utils/viewDataUtil');
const { isAuth } = require('../middlewares/authMiddleware');

router.get("/create", isAuth, (req, res) => {
  res.render("cube/create");
});

router.post("/create", isAuth, async (req, res) => {
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

  const isOwner = cube.owner?.toString() === req.user._id;

  res.render("cube/details", {
    ...cube,
    isOwner,
  });
});

// Accessory attachment
router.get("/:cubeId/attach-accessory", isAuth, async (req, res) => {
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

router.post('/:cubeId/attach-accessory', isAuth, async (req, res) => {
  const { cubeId } = req.params;
  const { accessory: accessoryId } = req.body;

  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/edit', isAuth, async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();

  //! This should be implemented everywhere for safeness! 
  if (cube.owner?.toString() !== req.user._id) {
    return res.redirect('/404');
  }

  const options = difficultyLevelOptionsViewData(cube.difficultyLevel);
 
  res.render('cube/edit', { cube, options });
});

router.post('/:cubeId/edit', isAuth, async (req, res) => {
  const { cubeId } = req.params;
  const { name, description, imageUrl, difficultyLevel } = req.body;
  const payload = { name, description, imageUrl, difficultyLevel };
  await cubeService.update(cubeId, payload);

  res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/delete', isAuth, async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();
  const options = difficultyLevelOptionsViewData(cube.difficultyLevel);
 
  res.render('cube/delete', { cube, options });
});

router.post('/:cubeId/delete', isAuth, async (req, res) => {
  const { cubeId } = req.params;
  await cubeService.delete(cubeId);

  res.redirect('/'); 
});

module.exports = router;