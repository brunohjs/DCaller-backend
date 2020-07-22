const express = require('express');
const httpStatus = require('http-status-codes');
const { sendResponse, logs } = require('./helpers/utils');
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
    let id = req.query.id;
    let data = {};
    if (req.query.new) {
        data.new = ['true', '1'].includes(data.new);
    }
    if (req.query.status) {
        data.status = req.query.status;
    }
    if (id && (data.new || data.status)) {
        logs(`Requisição de alteração para o id ${id}.`, req.method, 'info');
        let response = await DemandControllers.changeItem(id, data);
        if (response) {
            logs(`Item ${id} alterado para o status ${status} com sucesso.`, req.method, 'info');
            res.send(sendResponse(httpStatus.OK, response, "Item atualizado com sucesso."))
                .status(httpStatus.OK);
        } else {
            logs(`Erro no servidor`, req.method, 'error');
            res.send(sendResponse(httpStatus.INTERNAL_SERVER_ERROR, [], "Erro interno no servidor."))
                .status(httpStatus.INTERNAL_SERVER_ERROR);
        }
    } else {
        logs(`Erro na requisição.`, req.method, 'error');
        res.send(sendResponse(httpStatus.BAD_REQUEST, [], "Erro na requisição."))
                .status(httpStatus.BAD_REQUEST);
    }
});

router.get('/ping', async (req, res) => {
    res.send(sendResponse(httpStatus.OK, {}, "Teste de ping!"))
});

router.get('/drop', async (req, res) => {
    await DemandControllers.dropCollection();
    res.send(sendResponse(httpStatus.OK, {}, "Dados excluídos."))
})

module.exports = router;