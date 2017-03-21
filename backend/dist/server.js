"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bole = require("bole");
const config_1 = require("./config");
const index_1 = require("./index");
bole.output({
    level: 'debug',
    stream: process.stdout,
});
const log = bole('server');
log.info('server process starting');
log.info('config', config_1.default);
// Note that there's not much logic in this file.
// The server should be mostly "glue" code to set things up and
// then start listening
index_1.default.listen(config_1.default.express.port, config_1.default.express.ip, error => {
    if (error) {
        log.error('Unable to listen for connections', error);
        process.exit(10);
    }
    log.info(`listening on http://${config_1.default.express.ip}:${config_1.default.express.port}`);
});
