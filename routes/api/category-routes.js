const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categoryData);
    // using first function from mini proj
  } catch (err) {
    res.status(500).json(err);
  }
  
});

 // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', (req, res) => {
  try {
    const categoryData = Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [Product]
    })
    .then((categoryData) => res.status(200).json(categoryData));
  } catch (err) {
   res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      category_name: req.body.category_name,
      
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateCategory) => {
      // Sends the updated book as a json response
      res.json(updateCategory);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
