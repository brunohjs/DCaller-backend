const { logs } = require('../helpers/utils');
const DemandControllers = require('../controllers/DemandControllers');

async function main() {
    await DemandControllers.dropCollection();
    logs(`Banco limpo...`, 'SCHEDULER', 'info');
}

main();