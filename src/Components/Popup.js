import React from 'react'
import '../assets/css/popup.css'

function Popup(props) {
  let show = props.trigger;
  return (
    <div className={`popup ${show ? "show" : "occult"}`}>
        <div className={`popup-inner ${show ? "show" : "occult"}`}>
            {props.children}
        </div>
    </div>
  )
}

export default Popup