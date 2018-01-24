import React, { Component } from 'react'
import rocket from '../images/rocket.svg'

class App extends Component {

     render() {
         return (
             <div className='content'>
                 <div>
                     <nav>
                         <a href='#'>
                             <span>Amiral</span>
                         </a>
                         <a href='#'>
                             <span>Informations</span>
                         </a>
                         <svg style={{ height:0 }}>
                             <defs>
                                 <clipPath id='shape'>
                                     <polygon points='0 0, 211 0, 255 43, 255 69, 34 69, 0 26'></polygon>
                                 </clipPath>
                             </defs>
                         </svg>
                     </nav>
                 </div>
                 <div className='satellite-info'>
                    <div>{ this.props.data.amiral.name }</div>
                    <div> TOKEN: { this.props.data.token }</div>
                    <div> LAST CONNECTION: { this.props.data.amiral.lastconnection }</div>
                 </div>
             </div>
         )
     }

}

export default App
