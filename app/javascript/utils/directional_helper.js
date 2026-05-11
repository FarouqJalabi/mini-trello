function parseDirection(direction) {
  if (direction === "up")   { return [ "y", 1 ] }
  if (direction === "down") { return [ "y", -1 ] }
  if (direction === "left") { return [ "x", 1 ] }
  if (direction === "right"){ return [ "x", -1 ] }

  throw new Error("Weird direction: " + direction)
}

function elementCenter(element) {
    const rect = element.getBoundingClientRect()
    return [rect.left + (rect.width / 2), rect.top + (rect.height / 2)]
}

export function findElementByDirection(direction, elements, position) {
  const [axis, dir] = parseDirection(direction)
  if (position instanceof HTMLElement) { 
    const [x, y] = elementCenter(position)
    position = {x, y}
  }

  return elements.reduce((closest, element) => {
    const [centerX, centerY] = elementCenter(element)
    
    let axisDistance = axis === "x" ? position.x - centerX : position.y - centerY
    if (axisDistance * dir < 1) return closest

    const distance = Math.hypot(position.x-centerX, position.y - centerY) 

    if (distance < closest.distance) return {distance: distance, closest: element }
    return closest
  }, {distance: 9999, closest: null}).closest
}


