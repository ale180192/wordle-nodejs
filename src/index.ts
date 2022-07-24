import { Server } from './adapters/http/server';
import dataSource from './conf/dataSource';
import dotenv from 'dotenv'

dotenv.config()

const conf = {
    port: process.env.PORT,
    dbConnection: dataSource,
}
console.log("key:", process.env.TOKEN_KEY);

const server = new Server(conf)
server.listen();