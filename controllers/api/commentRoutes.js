const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log('comment post is running=================================')
    console.log(req.body)
    // try {
    console.log("try is running ~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
        name: req.session.user_id.name,
    });
    console.log("THIS IS THE REQUEST:", newComment)
    res.status(200).json(newComment);
    // } catch (err) {
    //     res.status(400).json(err);

    // }
});


router.put('/', withAuth, async (req, res) => {
    console.log('the put is running +++++++++++++++++++++++++++++++++++++++++')
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
                post_id: req.params.post_id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }

});

router.delete('/:id', withAuth, async (req, res) => {
    console.log('the delete is running ```````````````````````````')
    // try {
    const commentData = await Comment.destroy({
        where: {
            id: req.params.id,
        },
    });

    if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
    }

    res.status(200).json(commentData);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

module.exports = router;