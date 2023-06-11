const express = require('express');
const expressGraphQL = require('express-graphql');

const schema = require('./schema/schema');

const port =3000;

const app = express();

app.use('/graphql',expressGraphQL({
    graphiql:true,
    schema
}))

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})