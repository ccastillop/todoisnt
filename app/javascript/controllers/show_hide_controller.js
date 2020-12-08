import { Controller } from "stimulus"
import Cookies from "js-cookie"

export default class extends Controller {
  static values = { 
    messages: Array,
    name: String 
  }

  static targets = [ "element", "message", "chevron"]

  connect() {
    this.persistentName = `show-hide-${this.nameValue}`

    this.isOpen()
      ? this.setIsOpen(false)
      : this.setIsOpen(true)

    this.toggle()
  }
  
  isOpen() {
    return Cookies.get(this.persistentName) === "yes"
  }

  setIsOpen(bool) {
    Cookies.set(this.persistentName, bool ? "yes" : "no")
  }

  toggle() {
    this.setIsOpen(!this.isOpen())
    
    this.elementTargets.map((element) => {
      this.isOpen() 
        ? element.classList.remove("hidden")
        : element.classList.add("hidden")
    })

    if (this.hasMessagesValue && this.hasMessageTarget) {
      this.isOpen()
        ? this.messageTarget.innerText = this.messagesValue[1]
        : this.messageTarget.innerText = this.messagesValue[0]
    }

    this.chevronTargets.map((element) => {
      this.isOpen() 
      ? element.classList.add("rotate-90")
      : element.classList.remove("rotate-90")
    })

  }

}