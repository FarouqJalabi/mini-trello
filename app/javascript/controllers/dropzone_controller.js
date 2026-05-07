import { Controller } from "@hotwired/stimulus"
import { patch } from "@rails/request.js"

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
  }

  dragOverHandler = (ev) => {
    const allowDrop = ev.dataTransfer.getData("text/plain").includes(this.modelNameValue)
    if (allowDrop) { ev.preventDefault() }
  }

  dropHandler = (ev) => {
    const shouldHandleDrop = ev.dataTransfer.getData("text/plain").includes(this.modelNameValue)
    if (!shouldHandleDrop) {
      return
    }

    ev.preventDefault();
    ev.stopPropagation();

    const id = ev.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(id)

    const dropSibling = this.findClosestChild(ev)

    this.dropTarget.insertBefore(draggedElement, dropSibling);

    this.saveOrder()
  }

  findClosestChild = (ev) => {
    const children = [...this.dropTarget.children]

    const result = children.reduce((closest, child) => {
      const rect = child.getBoundingClientRect()
      const distance = this.isHorizontalValue
        ? ev.clientX - (rect.left + (rect.width / 2))
        : ev.clientY - (rect.top + (rect.height / 2))

      if (distance < 0 && distance > closest.distance) {
        return { distance, child }
      }
      return closest
    }, {distance: -90000, child: null});

    return result.child
  }

  saveOrder() {
    const order = [...this.dropTarget.children].map((child, index) => {
      const childId = child.id.split("_").pop()
      const listId = this.element.id?.split("_")?.pop()
      
      return {id: childId, order: index+1, list_id: listId}
    })

    const params = {body: {records: order}}
    patch(`/${this.modelNameValue}s`, params);
  }

  disconnect() {
    this.element.removeEventListener("dragover", this.dragOverHandler);
    this.element.removeEventListener("drop", this.dropHandler);
  }
}
