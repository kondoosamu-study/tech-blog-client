const express = require('express');
const router = express.Router();
const connection = require('../mysql');

let query = `
select *, group_concat(tags.name) as tags from articles as A
join categories as C ON C.id = A.category_id
join thumbnails as T ON T.id = A.thumbnail_id
join articles_tags as AT ON AT.article_id = A.id
join tags ON tags.id = AT.tag_id
where A.id = ?
group by A.id;`;

router.get('/category/ranking/:articleId', (req, res) => { 
// router.get('/category/ranking', (req, res) => { 
    const articleId = req.params.articleId;
    // const articleId = req.query.articleId;
    connection.query(query,[articleId], (err, result) => {
        if (err) {
            console.log(" Error query =======", err);
            return next(err);
        }
        res.json(result);       
    })
})

// select *, group_concat(tags.name) as tags from articles as A
// join categories as C ON C.id = A.category_id
// join thumbnails as T ON T.id = A.thumbnail_id
// join articles_tags as AT ON AT.article_id = A.id
// join tags ON tags.id = AT.tag_id
// where A.id = 1
// group by A.`id`;

module.exports = router;