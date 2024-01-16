const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

const withAuth = require('../utils/auth.js');

router.get('/', async (req, res) => {
  try {
                               // data to be requested 
    res.render('homepage')
  } catch (err) {
    res.status(500).json(err);  // error handling
  }
 
});

//questions get routes
router.get('/evaluation', async (req, res) => {
  try { 
                                // data to be requested 
    res.render('evaluation')
  } catch (err) {
    res.status(500).json(err); // error handling
  }
 
});

router.get('/signup', async (req, res) => {
  try {

    res.render('signup')
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the sessions id
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    })

    const user = userData.get({plain: true});

    res.render('profile', {
      ...user,
      logged_in: true
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;