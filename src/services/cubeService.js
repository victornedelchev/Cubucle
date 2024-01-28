const Cube = require('../models/Cube');

const cubes = [
    {
        id: '5sycuhrwlr9caf14',
        name: 'Cube1',
        description: 'Desc1',
        imageUrl: 'https://static5.depositphotos.com/1033600/501/i/450/depositphotos_5016489-stock-photo-rubiks-cube.jpg',
        difficultyLevel: 1
      },
      {
        id: '5sycuhrwlr9cb0j7',
        name: 'Cube2',
        description: 'Desc2',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9t9b2diPA7UGOKDZhBzGvosyAdIQ6VQiNJsRBhbgW43bh2YE7lxDwYKwNyu1TlXcDnQ&usqp=CAU',
        difficultyLevel: 6
      }
];

exports.create = async (cubeData) => {
  // const cube = new Cube(cubeData);
  // await cube.save();
  // or
  const cube = await Cube.create(cubeData);

  return cube;
};

exports.getAll = (search, from, to) => {
    let filterCubes = [...cubes];

    if (search) {
      filterCubes = filterCubes.filter((cube) => cube.name.toLowerCase().includes(search));
    }

    if (from) {
      filterCubes = filterCubes.filter((cube) => cube.difficultyLevel >= Number(from));
    }

    if (to) {
      filterCubes = filterCubes.filter((cube) => cube.difficultyLevel <= Number(to));
    }

    return filterCubes;
};

exports.getSingleCube = (id) => {
  return cubes.find((cube) => cube.id === id);
};