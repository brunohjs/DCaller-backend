const DatabaseController = require('../models/DatabaseModel');

class DemandControllers {
    async getCartridges() {
        return DatabaseController.Cartridge.find({}, {
            "_id": 0
        }, (err, response) => {
            return response;
        })
    }

    async getQueue(queue) {
        let filter = {};
        switch (queue) {
            case 'historic':
                filter = { $or: [{ status: "cancelado"}, { status: "finalizado"}] };
                break;
            case 'requested':
                filter = { status: 'aguardando' };
                break;
            case 'producing':
                filter = { status: 'produzindo' };
                break;
            default:
                filter = {};
                break;
        }
        return await DatabaseController.Item.find(filter, (err, response) => {
            return response;
        }).select({
            "__v": false
        });
    }

    async addItem(data) {
        try {
            data.status = "aguardando";
            data.createTime = new Date();
            data.endTime = new Date(data.endTime);
            data.new = true;
            const item = await new DatabaseController.Item(data);
            await item.save();
            return await this.getQueue();
        } catch (error) {
            return false;
        }
    }

    async changeItem(itemId, data) {
        const data = await DatabaseController.Item.findOneAndUpdate({ '_id': itemId }, data);
        return await this.getQueue();
    };

    async dropCollection() {
        await DatabaseController.Item.remove({});
    }
}

module.exports = new DemandControllers();