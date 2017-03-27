import * as invariant from 'invariant';

import { MongoClient, Db } from 'mongodb';
import config from './config';

const log = require('./logger')('db');

let db: Db;

export async function connect() {
  try {
    return db = await MongoClient.connect(config.mongodb.uri);
  } catch (e) {
    log.error('failed to connect to the database', e);
    process.exit(111);
  }
}

export function middleware(req, res, next) {
  invariant(!!db, 'db not initialized!');
  invariant(!req.db, 'db already exists on request object!');
  req.db = db;
  next();
}
