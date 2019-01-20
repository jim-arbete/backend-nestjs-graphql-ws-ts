const { GraphQLServer } = require('graphql-yoga')

if (process.env.NODE_ENV === 'development') {
	console.log('>> process.env.NODE_ENV: ', process.env.NODE_ENV)
}

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))