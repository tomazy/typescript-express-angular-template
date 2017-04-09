import { Db } from 'mongodb';
import { Request } from 'express';
import { graphqlExpress } from 'graphql-server-express';
import { schema } from './schema';

interface RequestWithDb extends Request {
  db: Db;
};

export default graphqlExpress(request => ({
  schema,
  context: {
    db: (request as RequestWithDb).db,
  },
}));
