import * as invariant from 'invariant';

import { MongoClient, Db } from 'mongodb';
import config from './config';

const log = require('./logger')('db');

let db: Db;

function waitForMongo(uri: string, timeout: number) {
  let timeouted = false;

  setTimeout(() => {
    timeouted = true;
  }, timeout);

  return new Promise((resolve, reject) => {
    tryConnect();

    function tryConnect() {
      if (timeouted) {
        reject(new Error('Timed out waiting for MongoDB'));
        return;
      }

      MongoClient.connect(uri, (err, db) => {
        if (err) {
          log.info('waiting for mongodb...', err);
          setTimeout(tryConnect, 1000);
        } else {
          db.close();
          resolve();
        }
      });
    }
  });
}

export async function connect() {
  try {
    await waitForMongo(config.mongodb.uri, 1000 * 30);
    db = await MongoClient.connect(config.mongodb.uri);
    log.info('mongodb is ready!');
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
