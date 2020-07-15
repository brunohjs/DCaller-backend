const express = require('express');
const httpStatus = require('http-status-codes');
const { sendResponse } = require('./helpers/utils');
const router = express.Router();

const DemandControllers = require('./controllers/DemandControllers');

router.get('/queue', async (req, res) => {
    res.send(await DemandControllers.getQueue());
});

router.post('/queue', async (req, res) => {
    if (req.body) {
        let response = await DemandControllers.addItem(req.body);
        if (response) {
            res.send(sendResponse(httpStatus.OK, response, "Item adicionado com sucesso."))
                .status(httpStatus.OK);
        } else {
            res.send(sendResponse(httpStatus.INTERNAL_SERVER_ERROR, [], "Erro interno no servidor."))
                .status(httpStatus.INTERNAL_SERVER_ERROR);
        }
    } else {
        res.send(httpStatus.getStatusText(httpStatus.BAD_REQUEST))
            .status(httpStatus.BAD_REQUEST);
    }
});

router.put('/queue', async (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    if (id && status) {
        let response = await DemandControllers.changeStatus(id, status);
        if (response) {
            res.send(sendResponse(httpStatus.OK, response, "Item atualizado com sucesso."))
                .status(httpStatus.OK);
        } else {
            res.send(sendResponse(httpStatus.INTERNAL_SERVER_ERROR, [], "Erro interno no servidor."))
                .status(httpStatus.INTERNAL_SERVER_ERROR);
        }
    } else {
        res.send(httpStatus.getStatusText(httpStatus.BAD_REQUEST))
            .status(httpStatus.BAD_REQUEST);
    }
});

router.get('/ping', async (req, res) => {
    res.send(sendResponse(httpStatus.OK, {}, "Teste de ping!"))
});

module.exports = router;