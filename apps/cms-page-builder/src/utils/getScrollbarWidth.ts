export function getScrollbarWidth (): number {
  const scrollDiv = document.createElement('div')
  scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
  document.body.append(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  scrollDiv.remove()
  return scrollbarWidth
}
