const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const post = postData.map((Post) => Post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const commentData = await Comment.findAll(req.body, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      where: {
        post_id: req.params.id,
      },
    });
    // const userData = await User.findByPk(req.body.user_id, {
    //   attributes: { exclude: ['password'] },
    // });
    console.log("THIS IS THE ONE WITH USERS:", commentData);
    const post = postData.get({ plain: true });
    const comments = commentData.map((item) => item.get({ plain: true }));
    console.log('~~~~~~~~~~~~~~~~~~~~~', comments, '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    res.render('post', {
      ...post,
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log('%c', err, 'background: #222; color: #bada55')
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    })
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    const posts = postData.map((Post) => Post.get({ plain: true }));
    res.render('profile', {
      ...user,
      posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
