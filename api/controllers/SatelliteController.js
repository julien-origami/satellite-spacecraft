import Paths from '../conf/Paths'
import DbController from './DbController'
import fetch from 'node-fetch'
import moment from 'moment'

require('dotenv').config()

const SatelliteController = {

    shareStatus: () => {
        DbController.getAmiralSpaceCraft(row => {
            SatelliteController.broadcast({
                amiral: row,
                token: SatelliteController.lastToken
            })
        })
    },

    fetchAmiralNewCode: token => {
        return fetch(Paths.extern.amiralPath, {
            method: 'PUT',
            body: JSON.stringify({ code: token })
        })
        .then(data => data.json())
        .catch(e => console.log(err))
    },

    pushToken: (token, then) => {
        DbController.insertCode(token, () => {
            SatelliteController.lastToken = token
            if (then) { then() }
        })
    },

    contactAmiral: () => {
        const requestAmiral = () => {
            DbController.getAmiralSpaceCraft(amiral => {
                const oldDate = moment().subtract(1.5, 'hours').format('YYYY-MM-DD HH:mm:ss')
                if (!moment(amiral.lastconnection).isBefore(oldDate)) {
                    let tokenIndex = 0
                    DbController.getTokens(rows => {
                        SatelliteController.fetchAmiralNewCode(rows[tokenIndex].token)
                        .then(json => {
                            console.log('RESPONSE AMIRAL =====>', json)
                            tokenIndex++
                            if (!json.idErr && json.error) {
                                SatelliteController.pushToken(json.newCode, () => {
                                    DbController.deleteOldTokens(oldDate)
                                    DbController.updateAmiralSpaceCraft(process.env.FLEET_ID)
                                    SatelliteController.shareStatus()
                                })
                            } else if (tokenIndex < rows.length) {
                                SatelliteController.fetchAmiralNewCode(rows[tokenIndex])
                            }
                        })
                    })
                } else {
                    throw new Error('Satellite Quit the fleet ===> Amiral is down')
                }
            })
        }
        requestAmiral()
        setInterval(() => {
            requestAmiral()
        }, 5*60*1000)
    },

    createAmiral: callback => {
        DbController.deleteSpaceCraft((row) => {
            DbController.updateAmiralSpaceCraft(process.env.FLEET_ID, callback)
        })
    },

    lastToken: ''

}

export default SatelliteController
