import { Controller } from "stimulus"
import Cookies from "js-cookie"

export default class extends Controller {
  static values = { messages: Array }
  static targets = [ "element", "message" ]

  connect() {
    if ( Cookies.get("show-hide") === "yes" ) {
      Cookies.set("show-hide", "no")
      this.toggle()
    } else {
      Cookies.set("show-hide", "yes")
      this.toggle()
    }
  }

  toggle() {
    if ( Cookies.get("show-hide") === "yes" ) {
      Cookies.set("show-hide", "no")
      this.messageTarget.innerText = this.messagesValue[0]
    }
    else {
      Cookies.set("show-hide", "yes")
      this.messageTarget.innerText = this.messagesValue[1]
    }
    
    this.elementTargets.map((element) => {
      if ( Cookies.get("show-hide") === "yes" )
        element.classList.remove("hidden")
      else
        element.classList.add("hidden")
    })
  }

}