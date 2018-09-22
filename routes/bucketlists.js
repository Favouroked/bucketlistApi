var express = require('express');
var router = express.Router();
const {BucketList, Items} = require('../models/bucketlist');

/* GET home page. */
router.post('/', function (req, res, next) {
    const {name} = req.body, created_by = req.user.id;
    BucketList.create({name, created_by}, (err, bucketlist) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        return res.status(201).json(bucketlist);
    });
});

router.get('/', (req, res) => {
    BucketList.find({}, (err, bucketlists) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        return res.status(200).json(bucketlists);
    })
});

router.get('/:bucket_id', (req, res) => {
    BucketList.findById(req.params.bucket_id, (err, bucketlist) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        return res.status(200).json(bucketlist)
    })
});

router.put('/:bucket_id', (req, res) => {
    const update = {...req.body, date_modified: new Date()};
    const id = req.params.bucket_id;
    BucketList.findByIdAndUpdate(id, update, {new: true}, (err, bucketlist) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        return res.status(200).json(bucketlist);
    })
});

router.delete('/:bucket_id', (req, res) => {
    const id = req.params.bucket_id;
    BucketList.findByIdAndDelete(id, (err, _) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        return res.status(200).json({status: true});
    })
});

router.post('/:bucket_id/items', (req, res) => {
    const bucket_id = req.params.bucket_id;
    const {name} = req.body;
    BucketList.findByIdAndUpdate(bucket_id, {date_modified: new Date()}, {new: true}, (err, bucketlist) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        const item = new Items({name});
        bucketlist.items.push(item);
        bucketlist.save();
        return res.status(201).json({status: "success"});
    });
});

router.get('/:bucket_id/items', (req, res) => {
    const bucket_id = req.params.bucket_id;
    BucketList.findById(bucket_id, (err, bucketlist) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        return res.status(200).json(bucketlist.items);
    })
});

router.get('/:bucket_id/items/:item_id', (req, res) => {
    const bucket_id = req.params.bucket_id;
    const item_id = req.params.item_id;
    BucketList.findById(bucket_id, (err, bucketlist) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        const item = bucketlist.items.filter((item) => item.id === item_id);
        return res.status(200).json(item[0]);
    })
});

router.put('/:bucket_id/items/:item_id', (req, res) => {
    const bucket_id = req.params.bucket_id;
    const item_id = req.params.item_id;
    const {name, done} = req.body;
    BucketList.findByIdAndUpdate(bucket_id, {date_modified: new Date()}, {new: true}, (err, bucketlist) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        let item_index = bucketlist.items.findIndex(item => item.id === item_id);
        bucketlist.items[item_index].name = name || bucketlist.items[item_index].name;
        bucketlist.items[item_index].done = done || bucketlist.items[item_index].done;
        bucketlist.items[item_index].date_modified = new Date();
        bucketlist.save();
        return res.status(200).json(bucketlist.items[item_index]);
    });
});

router.delete('/:bucket_id/items/:item_id', (req, res) => {
    const bucket_id = req.params.bucket_id;
    const item_id = req.params.item_id;
    BucketList.findByIdAndUpdate(bucket_id, {date_modified: new Date()}, {new: true}, (err, bucketlist) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        let remaining_items = bucketlist.items.filter(item => item.id !== item_id);
        bucketlist.items = remaining_items;
        bucketlist.save();
        return res.status(200).json(bucketlist.items);
    });
});

module.exports = router;
