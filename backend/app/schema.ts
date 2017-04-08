import {Db} from 'mongodb';
import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from 'graphql-tools';
import {createGateway, Todo} from './todos/model';

const typeDefs = [`
  type Todo {
    id: ID!
    description: String
    completed: Boolean
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(description: String!): Todo
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

type Context = {
  db: Db,
};

const resolvers = {
  Mutation: {
    addTodo(root, args, context) {
      const { description } = args;
      const todo: Todo = {
        id: null,
        description,
      };
      return createGateway(context.db).insert(todo);
    },
  },

  Query: {
    todos(root, args, context: Context) {
      return createGateway(context.db).findAll();
    },
  },
};

export const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });
