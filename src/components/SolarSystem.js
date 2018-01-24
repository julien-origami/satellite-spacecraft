import React, { Component } from 'react'

class App extends Component {

     render() {
         return (
             <div className='scifi-nav'>
                 <div className='scifi-nav__system'>
                     <li className='scifi-nav__orbit'>
                         <a className='scifi-nav__satellite' href='javascript:void(0)'>
                             <span className='scifi-nav__label'>
                                 Mission
                                 <span className='scifi-nav__description'>
                                     Difficulty level 0
                                 </span>
                             </span>
                         </a>
                     </li>
                     <li className='scifi-nav__orbit'>
                         <a className='scifi-nav__satellite' href='javascript:void(0)'>
                             <span className='scifi-nav__label'>
                                 Countdown
                                 <span className='scifi-nav__description'>
                                     Difficulty level 5
                                 </span>
                             </span>
                         </a>
                     </li>
                     <li className='scifi-nav__orbit'>
                         <a className='scifi-nav__satellite' href='javascript:void(0)'>
                             <span className='scifi-nav__label'>
                                 Hipersleep
                                 <span className='scifi-nav__description'>
                                     Difficulty level 4
                                 </span>
                             </span>
                         </a>
                     </li>
                     <li className='scifi-nav__orbit'>
                         <a className='scifi-nav__satellite' href='javascript:void(0)'>
                             <span className='scifi-nav__label'>
                                 Cruise
                                 <span className='scifi-nav__description'>
                                     Difficulty level 8
                                 </span>
                             </span>
                         </a>
                     </li>
                     <li className='scifi-nav__orbit'>
                         <a className='scifi-nav__satellite' href='javascript:void(0)'>
                             <span className='scifi-nav__label'>
                                 Landing
                                 <span className='scifi-nav__description'>
                                     Difficulty level 2
                                 </span>
                             </span>
                         </a>
                     </li>
                     <li className='scifi-nav__orbit'>
                         <a className='scifi-nav__satellite' href='javascript:void(0)'>
                             <span className='scifi-nav__label'>
                                 Research
                                 <span className='scifi-nav__description'>
                                     Difficulty level 7
                                 </span>
                             </span>
                         </a>
                     </li>
                 </div>
                 <div className='hologram'></div>
             </div>
         )
     }

}

export default App
