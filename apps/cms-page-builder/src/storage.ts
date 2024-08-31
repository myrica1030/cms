interface StorageData {
  modalPosition?: UI.ModalStyle | null
}

const storageData: StorageData = {}

const storage = new Proxy(storageData, {
  get(_store, prop) {
    const text = localStorage.getItem(String(prop)) ?? 'null'
    try {
      return JSON.parse(text) as unknown
    }
    catch {
      return null
    }
  },
  set(_store, prop, value) {
    localStorage.setItem(String(prop), JSON.stringify(value))
    return true
  },
})

export default storage
