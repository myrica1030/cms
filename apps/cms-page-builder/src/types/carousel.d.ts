declare namespace UI {
  interface Slide {
    title?: string
    body?: string
    button?: Button
    background?: string
  }

  interface Carousel {
    slides: Slide[]
    duration?: number
    animation?: 'slide'
    indicator?: boolean
    arrow?: boolean
  }
}
