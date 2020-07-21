require('dotenv').config();
const mongoose = require('mongoose');

class DatabaseModel {
    constructor() {
        this.connect = async () => {
            const url = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        }
        this.connect();
        
        this.Item = mongoose.model('Item', new mongoose.Schema({
            name: String,
            customer: String,
            new: Boolean,
            quantity: Number,
            createTime: Date,
            endTime: Date,
            status: String
        }), 'queue');
    }
}

module.exports = new DatabaseModel()