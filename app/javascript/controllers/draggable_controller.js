import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="draggable"
export default class extends Controller {
  connect() {
    this.element.draggable = true;

    this.element.querySelectorAll("a, img").forEach((el) => {
      el.draggable = false;
    });

    this.element.addEventListener("drag", this.dragHandler);
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  dragStartHandler = (ev) => {
    ev.stopPropagation();
    this.element.classList.add("rotate-45");
    ev.dataTransfer.setData("text/plain", ev.target.id); 
  }

  dragHandler = (ev) => {
    this.element.classList.add("hidden");
    ev.stopPropagation();
  }

  dragEndHandler = (_ev) => {
    this.element.classList.remove("hidden")
    this.element.classList.remove("rotate-45")
  }

  disconnect() {
    this.element.removeEventListener("drag", this.dragHandler);
    this.element.removeEventListener("dragstart", this.dragStartHandler);
    this.element.removeEventListener("dragend", this.dragEndHandler);
  }
}
