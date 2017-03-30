import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './typeDefs.js';
import { resolverMap } from './resolvers.js';

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolverMap,
});
export default schema;
