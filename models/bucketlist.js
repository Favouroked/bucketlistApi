const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
    name: String,
    date_created: { type: Date, default: Date.now },
    date_modified: { type: Date, default: Date.now },
    done: { type: Boolean }
});

const BucketListSchema = new Schema({
    name: String,
    items: [ItemsSchema],
    date_created: { type: Date, default: Date.now },
    date_modified: { type: Date, default: Date.now },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Items = mongoose.model('Items', ItemsSchema);
const BucketList = mongoose.model('BucketList', BucketListSchema);

module.exports = { BucketList, Items };