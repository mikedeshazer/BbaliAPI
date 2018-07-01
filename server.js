require('rootpath')();
require('dotenv').config()

const isDev = require('isdev');

if (isDev) {
    process.env.NODE_ENV = 'development';
} else {
    process.env.NODE_ENV = 'production';
}

const throng = require('throng');
const express = require('api/core/express');
const chalk  = require('chalk');
const mongoose = require('mongoose');
const log = console.log;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST);

const startWorker = (workerId, cb) => {
    const app = express.init();

    app.listen(process.env.PORT, () => {
        (!workerId || workerId === 1) && log(chalk.yellow(
            `____________________________________________________________________\n\n`,
            `|  Server is running at ${process.env.HOST}:${process.env.PORT}    \n`,
            `|  Database:\t ${process.env.DB_HOST}                   \n`,
            `|  Environment: ${process.env.NODE_ENV}               \n`,
            `____________________________________________________________________`
        ));
        if (cb) {
            cb(app, config);
        }
    });
}


const concurrency = isDev ? 1 : process.env.WEB_CONCURRENCY || require('os').cpus().length;

throng({
    workers: concurrency,
    master() {
        log(chalk.green(`Master cluster started. Setting ${concurrency} worker(s)`));
    },
    start(id) {
        log(chalk.yellow(`Worker ${id} started`))
        startWorker(id);
        process.on('SIGTERM', () => {
            log(log(chalk.cyan(`Worker ${id} terminated`)));
            process.exit();
        })
    }
})
