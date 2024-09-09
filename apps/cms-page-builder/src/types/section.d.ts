declare namespace UI {
  interface SectionBase {
    id: string
  }

  interface FullWidthSection extends SectionBase {
    type: 'full-width'
    module: FullWidthModule
  }

  interface RegularSection extends SectionBase {
    type: 'regular'
    columns: Column[]
  }

  type Section = FullWidthSection | RegularSection
}
