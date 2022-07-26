import { Server } from './adapters/http/server';
import dataSource from './conf/dataSource';
import dotenv from 'dotenv'
import AppDataSource from './conf/dataSource';

dotenv.config()

const conf = {
    port: process.env.PORT,
    dbConnection: dataSource,
}

const server = new Server(conf)
server.listen();