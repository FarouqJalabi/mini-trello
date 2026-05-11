import { Controller } from "@hotwired/stimulus"
import { patch } from "@rails/request.js"
import { findElementByDirection } from "utils/directional_helper"

// Connects to data-controller="dropzone"
export default class extends Controller {
  static targets = [ "drop" ]

  static values = {
    modelName: String,
    isHorizontal: true,
  }

  connect() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("dragenter", this.dragEnterHandler);
  }

  shouldHandleDrop() {
    return window.elementDragged.id?.includes(this.modelNameValue);
  }

  dragEnterHandler = (ev)=>{
    if (this.element.contains(ev.relatedTarget)) { return }
    if (!this.shouldHandleDrop()) { return }

    this.dispatch("dragenter", { bubbles: false, detail: {event: ev } })
  }

  dragLeaveHandler = (ev) => {
    if (this.element.contains(ev.relatedTarget)) {return ;}
    this.dispatch("dragleave", { bubbles: false, event: ev })
  }

  dragOverHandler = (ev) => {
    if (!this.shouldHandleDrop()) { return }

    ev.preventDefault() // To alllow drop
    
    this.dispatch("dragover", { bubbles: false, detail: {event: ev} } )
  }

  dropHandler = (ev) => {
    if (!this.shouldHandleDrop()) { return }

    this.dispatch("drop", { bubbles: false, detail: {event: ev} })

    ev.preventDefault();
    ev.stopPropagation();

    const dropChildTarget = findElementByDirection(this.isHorizontalValue ? "right" : "down", this.draggableSiblings(), {x: ev.clientX, y: ev.clientY})
    this.dropTarget.insertBefore(window.elementDragged, dropChildTarget);

    this.saveOrder()
  }

  draggableSiblings() {
    return Array.from(this.dropTarget.querySelectorAll(`[id^="${this.modelNameValue}"]`))
  }

  saveOrder() {
    const order = this.draggableSiblings().map((child, index) => {
      const childId = child.id.split("_").pop()
      const listId = this.element.id?.split("_")?.pop()
      
      return {id: childId, order: index+1, list_id: listId}
    })

    const params = {body: {records: order}}
    patch(`/${this.modelNameValue}s`, params); // Assumes s for plural :(
  }

  disconnect() {
    this.element.removeEventListener("dragover", this.dragOverHandler);
    this.element.removeEventListener("drop", this.dropHandler);
  }
}
