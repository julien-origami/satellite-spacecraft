import Hapi                 from 'hapi'
import Nes                  from 'nes'
import Db                   from './api/conf/Db'
import SatelliteController  from './api/controllers/SatelliteController'
import DbController  from './api/controllers/DbController'

require('dotenv').config()

if (!process.env.AMIRAL_URL || !process.env.DB_CON || !process.env.APP_IP || !process.env.APP_PORT || !process.env.FLEET_ID || !process.env.FIRST_TOKEN) {
    throw 'Make sure you defined DB_CON, APP_IP, APP_PORT, FLEET_ID, FIRST_TOKEN and AMIRAL_URL in your .env file'
}

const server = new Hapi.Server()
exports.server = server
server.connection({ port: process.env.APP_PORT, host: process.env.APP_IP, routes: { cors: true } })

/* ##### PREPARE WEB-SOCKET ##### */
server.register(Nes, err => {
    if (err) {
        console.log(err)
        throw err
    }
    SatelliteController.broadcast = data => server.broadcast(data)
})

/* ##### INITIALIZE DB CONNECTION ##### */
const db = Db.connection


/* ##### START TO CONTACT THE AMIRAL ##### */
SatelliteController.createAmiral(row => {
    SatelliteController.pushToken(process.env.FIRST_TOKEN, () => {
        SatelliteController.contactAmiral()
    })
})

server.route({
    method: 'GET',
    path: '/satellite',
    config: {
        handler: (response, reply) => {
            DbController.getAmiralSpaceCraft(row => {
                reply({
                    amiral: row,
                    token: SatelliteController.lastToken
                })
            })
        }
    }
})

/* ##### START THE HAPI SERVER ##### */
server.start(err => {
    if (err) {
        throw err
    }
    console.log('Server running at:', server.info.uri)
})
