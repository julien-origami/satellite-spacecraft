import React, { Component } from 'react'
import Content from './Content'
import Title from './Title'
import VoiceGraph from './VoiceGraph'
import SolarSystem from './SolarSystem'
import Nes from 'nes'
import { APP_IP, APP_PORT } from '../path/Conf'

const $ = window.$

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            amiral : {
                name: '',
                lastconnection: ''
            },
            token: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            $('.loader').addClass('hidden')
        }, 7000)

        const socket = `ws://${APP_IP}:${APP_PORT}`
        const client = new Nes.Client(socket)
        client.connect(err => {
            if (err) {
                return console.log('err connecting', err)
            }
            client.onUpdate = update => this.setState(update)
        })

        fetch(`http://${APP_IP}:${APP_PORT}/satellite`)
        .then(data => data.json())
        .then(json => this.setState(json))
        .catch(e => console.log(e))
    }

     render() {
         return (
            <div>
                <div className='solar-nav'>
                    <Title />
                    <VoiceGraph />
                    <SolarSystem />
                </div>
                <Content data={this.state}/>
            </div>
        )
    }
}

export default App
