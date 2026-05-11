import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="draggable"
export default class extends Controller {
  connect() {
    this.element.draggable = true;

    this.element.querySelectorAll("a, img").forEach((el) => {
      el.draggable = false;
    });

    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  dragStartHandler = (ev) => {
    ev.stopPropagation();

    window.elementDragged = this.element
    setTimeout(()=> {this.element.classList.add("hidden")}, 1);
  }
  
  dragEndHandler = (ev) => {
    this.element.classList.remove("hidden")
    window.currentDrag = null
  }

  disconnect() {
    this.element.removeEventListener("dragstart", this.dragStartHandler);
    this.element.removeEventListener("dragend", this.dragEndHandler);
  }
}
