import { Controller } from "@hotwired/stimulus"
import { findElementByDirection } from "utils/directional_helper"

const ARROW_DIRECTIONS = {ArrowUp: "up", ArrowRight: "right", ArrowLeft: "left", ArrowDown: "down"}

// Connects to data-controller="moveable"
export default class extends Controller {
  connect() {
    this.element.addEventListener("keydown", this.keydownHandler)
    this.element.tabIndex = 0
    this.modelName = this.element.id.split("_")[0]
  }

  disconnect() {
    this.element.removeEventListener("keydown", this.keydownHandler)
  }

  keydownHandler = (event) => {
    const direction = ARROW_DIRECTIONS[event.key]
    if (!direction) return

    event.stopPropagation();

    let targetElements = Array.from(document.querySelectorAll(`[id^="${this.modelName}_"]`)) 
    const includeEmptyLists = (this.modelName == "card" && event.ctrlKey) && (direction == "left" || direction == "right")
    if (includeEmptyLists) targetElements = targetElements.concat(Array.from(document.querySelectorAll('.card-holder')))

    let targetElement = findElementByDirection(direction, targetElements, this.element)
    if (!targetElement) { return }

    const targetElementIsCardHolder = targetElement.matches('.card-holder')
    let targetParent = targetElementIsCardHolder ? targetElement : targetElement.parentNode

    if (event.ctrlKey) {
      if ((direction == "down" || direction == "right") && !targetElementIsCardHolder) {
        targetElement = targetElement.nextSibling 
      }

      targetParent.insertBefore(this.element, targetElementIsCardHolder ? null : targetElement)
      this.element.focus({ focusVisible: true })
      this.saveOrder()
    } else {
      targetElement.focus({ focusVisible: true })
    }
  }

  saveOrder = () => {
    const parentDropzone = this.application.getControllerForElementAndIdentifier(this.element.parentNode.closest('[data-controller~="dropzone"]'),"dropzone");
    parentDropzone.saveOrder()
  }
}
