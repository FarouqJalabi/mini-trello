import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dialog"
export default class extends Controller {
  // TODO instead of open after rendered maybe render when loading with loading status?
  connect() {
    this.element.querySelector("turbo-frame").addEventListener("turbo:frame-load", (event) => {
      this.element.showModal();
    })
  }
}
