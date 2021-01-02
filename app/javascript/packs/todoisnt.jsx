import React from 'react'
import ReactDOM from 'react-dom'
import Todoisnt from '../components/Todoisnt'

document.addEventListener("turbo:load", () => {
  const el = document.getElementById("todoisnt")
  if (el) {
    ReactDOM.render(
      <Todoisnt name="React" />, 
      el
    )
  }
})
