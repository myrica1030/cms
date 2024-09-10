if (!import.meta.env.CMS_API_URL && !import.meta.env.CMS_API_PORT) {
  console.error('CMS_API_URL and CMS_API_PORT are not set in .env file. Using default values.')
}

const API_URL = String(import.meta.env.CMS_API_URL
  ?? `http://localhost:${import.meta.env.CMS_API_PORT}`)

const CONFIG = {
  API_URL,
  animateDuration: 300,
  toastDuration: 4000,
}

export default CONFIG
