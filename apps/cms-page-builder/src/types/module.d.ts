declare namespace UI {
  import type { StyleValue } from 'vue'

  interface ModuleBase {
    id: string
    style?: StyleValue
  }

  interface FullWidthHeaderModule extends ModuleBase {
    type: 'full-width-header'
    title?: string
    subTitle?: string
    button1?: Button
    button2?: Button
    body?: string
  }

  interface FullWidthImageModule extends ModuleBase {
    type: 'full-width-image'
    src?: string
    alt?: string
  }

  interface FullWidthCarouselModule extends ModuleBase, Carousel {
    type: 'full-width-carousel'
  }

  type FullWidthModule =
    | FullWidthHeaderModule
    | FullWidthImageModule
    | FullWidthCarouselModule

  type Module =
    | FullWidthModule
}
