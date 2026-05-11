import { Controller } from "@hotwired/stimulus"
import { findElementByDirection } from "utils/directional_helper"

// Connects to data-controller="indicator"
export default class extends Controller {
  static values = {isHorizontal: true}

  connect() {
    this.parentDropzone = this.element.parentNode.closest('[data-controller~="dropzone"]')
    this.parentDropzone.addEventListener("dropzone:dragover", this.dragOverHandler)
    this.parentDropzone.addEventListener("dropzone:dragenter", this.dragEnterHandler)
    this.parentDropzone.addEventListener("dropzone:dragleave", this.hide)
    this.parentDropzone.addEventListener("dropzone:drop", this.hide)
  }

  disconnect() {
    this.parentDropzone.removeEventListener("dropzone:dragover", this.dragOverHandler)
    this.parentDropzone.removeEventListener("dropzone:dragenter", this.dragEnterHandler)
    this.parentDropzone.removeEventListener("dropzone:dragleave", this.hide)
    this.parentDropzone.removeEventListener("dropzone:drop", this.hide)
  }
 
  hide = ({ detail: { event } }) => {
    this.element.classList.add("hidden") 
  }

  dragEnterHandler = ({ detail: { event } }) => {
    this.moveToTarget(event)
    this.element.classList.remove("hidden")
  }

  dragOverHandler = ({ detail: { event } }) => {
    this.moveToTarget(event)
  }

  draggableSiblings() {
    return Array.from(this.element.parentNode.querySelectorAll(":scope > :not(.indicator):not(.hidden)"))
  }

  moveToTarget = (event) => {
    const closest = findElementByDirection(this.isHorizontalValue ? "left" : "up", this.draggableSiblings(), {x: event.clientX, y: event.clientY})
    
    const containerRect = this.element.parentNode.getBoundingClientRect();
    const rect = closest?.getBoundingClientRect();

    if (this.isHorizontalValue) {
      if (rect) {
        this.element.style.left = `${(rect.right - containerRect.left) - 14}px`;
      } else { 
        this.element.style.left = "0px"
      }
    } else {
      if (rect) {
        this.element.style.top = `${(rect.bottom - containerRect.top) + 2}px`;
      } else { 
        this.element.style.top = "0px"
      }
    }
  }
}
