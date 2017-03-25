import { MongoClient, Db, Collection } from 'mongodb';
import config from './config';

const log = require('bole')('db')
const debug = require('debug')('db')

let db

type WithDBCallback = (db: Db) => Promise<any>;
type WithCollectionCallback = (collection: Collection) => Promise<any>;

async function connect() {
  db = await MongoClient.connect(config.mongodb.uri);
}

function withDB(callback: WithDBCallback): Promise<any> {
  if (!db) {
    throw new Error('not connected yet')
  }
  return callback(db)
}

export function withCollection(collectionName: string, callback: WithCollectionCallback): Promise<any> {
  return withDB(db => callback(db.collection(collectionName)));
}

connect()
