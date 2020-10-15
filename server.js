if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')
const app = express()

//Setup Database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', err => { console.log(err) })
db.on('open', () => { console.log('Connected to Mongoose') })

const rootObjType = require('./graphql_object/root')
const schema = new GraphQLSchema({
    query: rootObjType
})

// app.use('/', seeder)

app.use('/graphql' , graphqlHTTP({
    schema: schema,
    graphiql: true
}))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Running on port ${PORT}`))