import { Controller } from "stimulus"
import Cookies from "js-cookie"

export default class extends Controller {
  static values = { 
    messages: Array,
    name: String 
  }

  static targets = [ "element", "message" ]

  connect() {
    this.persistentName = `show-hide-${this.nameValue}`

    if ( this.isOpen() )
      this.setIsOpen(false)
    else
      this.setIsOpen(true)

    this.toggle()
  }
  
  isOpen() {
    return Cookies.get(this.persistentName) === "yes"
  }

  setIsOpen(bool) {
    Cookies.set(this.persistentName, bool ? "yes" : "no")
  }

  toggle() {
    if ( this.isOpen() ) {
      this.setIsOpen(false)
      this.messageTarget.innerText = this.messagesValue[0]
    }
    else {
      this.setIsOpen(true)
      this.messageTarget.innerText = this.messagesValue[1]
    }
    
    this.elementTargets.map((element) => {
      if ( this.isOpen() )
        element.classList.remove("hidden")
      else
        element.classList.add("hidden")
    })
  }

}