import * as invariant from 'invariant';

import { MongoClient, Db, Collection } from 'mongodb';
import config from './config';

const log = require('bole')('db')
const debug = require('debug')('db')

let db

type WithDBCallback = (db: Db) => Promise<any>;
type WithCollectionCallback = (collection: Collection) => Promise<any>;

export async function connect() {
  try {
    return db = await MongoClient.connect(config.mongodb.uri);
  } catch (e) {
    log.error('failed to connect to the database', e)
    process.exit(111);
  }
}

function withDB(callback: WithDBCallback): Promise<any> {
  invariant(!!db, 'db not initialized!')
  return callback(db)
}

export function withCollection(collectionName: string, callback: WithCollectionCallback): Promise<any> {
  return withDB(db => callback(db.collection(collectionName)));
}
