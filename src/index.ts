const { GraphQLServer, PubSub } = require('graphql-yoga') // Websocket, Express, Cors, Apollo, Graphql
const morgan = require('morgan') // URL request logger
require('dotenv').config()


if (process.env.NODE_ENV === 'development') {
	console.log('>> process.env.NODE_ENV yo: ', process.env.NODE_ENV)
}
 
// MOCK DATA (Instad of real db..)
let homesMockDB = [
  {
    id: '1',
    name: 'Hus1',
    rooms: [
      {
        name: 'Vardagsrum',
        temperature: 21,
        humidity: 0.2
      },
      {
        name: 'Kök',
        temperature: 28,
        humidity: 0.95

      }
    ]
  },
  {
    id: '2',
    name: 'Hus2',
    rooms: [
      {
        name: 'Vardagsrum',
        temperature: 21,
        humidity: 0.20
      },
      {
        name: 'Kök',
        temperature: 28,
        humidity: 0.95

      }
    ]
  },
]

// Simulate measurements that changes faster than normal..
randomiseLastDigitTemperatureAndParseToFloat = orgValue => {
  return parseFloat( parseFloat(orgValue) + Math.floor(Math.random() * 3)-1 )
}
randomiseLastDigitHumidityAndParseToFloat = orgValue => {
  if (Math.random() < 0.5) {
    return parseFloat(orgValue + parseFloat(Math.random() * (0.02 - 0.01))).toFixed(2)
  } else {
    return parseFloat(orgValue - parseFloat(Math.random() * (0.02 - 0.01))).toFixed(2)
  }  
}

// Mock Actions to test dynamic data with websockets
let intervalSeconds = 4 * 1000 // change every 4 seconds
setInterval(() => {
  homesMockDB.map(house => {
    house.rooms.map(room => {
      room.temperature = randomiseLastDigitTemperatureAndParseToFloat(room.temperature)
      room.humidity = randomiseLastDigitHumidityAndParseToFloat(room.humidity)
    })
  })
  pubsub.publish('housesChanged', { housesChanged: homesMockDB}) // Trigger "housesChanged" subscription event..
}, intervalSeconds)


// GraphQL schema
const typeDefs = `
  type Query {
    house(id: ID!): House
    houses: [House]
  }

  type House {
    id: ID!
    name: String
    rooms: [Room]!
  }

  type Room {
    name: String!
    temperature: Float
    humidity: Float
  }

  type Subscription {
    housesChanged: [House]
  }
`

const resolvers = {
  Query: {
    house: (_, { id }) => homesMockDB.find(home => home.id === id),
    houses: () => homesMockDB
  },
  Subscription: {
    housesChanged: {      
      subscribe: () => pubsub.asyncIterator('housesChanged') // listener for event => if triggered => send our dynamic data to the client with AsyncIterator 
    }
  }
}

const options = {
  port: process.env.PORT || 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions', // websocket
  playground: '/playground',
}

const pubsub = new PubSub() // Graphql subscription (websocket)
const websocketServer = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } })
websocketServer.use(morgan('combined')) // log network requests in console
websocketServer.start(options, ({ port }) => console.log(`Websocket Server is running on http://localhost:${port}`))



// query {
//   house(id: 2) {
//   	id
//     name
//     rooms {
//       name
//       temperature
//       humidity
//     }
//   }
//   houses {
//     id
//     name
//     rooms {
//       name
//       temperature
//       humidity
//     }
//   }
// }


// subscription {
//   housesChanged {
//     id
//     name
//     rooms {
//       name
//       temperature
//       humidity
//     }
//   }
// }