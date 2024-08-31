interface StorageData {
  modalPosition?: UI.ModalStyle | null
}

const storageData: StorageData = {}

const storage = new Proxy(storageData, {
  get (store, prop) {
    const text = localStorage.getItem(String(prop)) ?? 'null'
    try {
      return JSON.parse(text)
    } catch {
      return null
    }
  },
  set (store, prop, value) {
    localStorage.setItem(String(prop), JSON.stringify(value))
    return true
  },
})

export default storage
