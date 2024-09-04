const CONFIG = {
  API_URL: String(import.meta.env.CMS_API_URL ?? `http://localhost:${import.meta.env.CMS_API_PORT}`),
  animateDuration: 300,
  toastDuration: 4000,
}

export default CONFIG
