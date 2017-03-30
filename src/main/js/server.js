




import path from 'path';

import koa from 'koa'; // koa@2
import koaRouter from 'koa-router'; // koa-router@next
import koaBody from 'koa-bodyparser'; // koa-bodyparser@next
import { graphqlKoa } from 'graphql-server-koa';
import koaStatic from 'koa-static'
import graphiql from 'koa-custom-graphiql'
import graphqlHTTP from 'koa-graphql'


import schema from './graphql/data/schema.js';
import schemaJM from './graphql/data/schemaJM.js';

import resolverMap from './graphql/data/resolvers';

import cors from 'koa-cors'
import { printSchema } from 'graphql/utilities/schemaPrinter';



const app = koa()
const router = koaRouter()

app.use(cors())

router.get('/graphql', graphiql({
  css: '/graphiql.css',
  js: '/graphiql.js',
  theme: 'material'
}))


router.post('/graphql', graphqlKoa({
  schema: schemaJM,
  formatError: e => {
    console.error(e)
    return e
  }
}))

router.get('/graphqlschema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});
router.redirect('/', '/graphql')


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);


app.use(router.routes())
app.use(router.allowedMethods())
// serve the custom build of GraphiQL
app.use(koaStatic(path.join(__dirname, 'node_modules/graphsiql')))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening at http://localhost:${port}/graphql && http://localhost:${port}/graphql-relay`))
