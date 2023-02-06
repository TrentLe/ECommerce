const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    })
    res.status(200).json(categoryData)
  } catch (error) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value 
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    })
    if (!categoryData) {
      res.status(404).json({ message: 'Thats not a category. Try again'})
      return
    } 
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      },
    })

  if (!categoryData) {
    res.status(404).json({ message: 'That id could not be found !'})
    return
  }
  res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
