declare namespace UI {
  type ColumnWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

  interface Column {
    width: ColumnWidth
    rows: Row[]
  }

  interface Row {
    modules: Module[]
  }
}
