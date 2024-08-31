import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { AppKey } from 'src/appMenu'
import { routeMap } from 'src/route'

function useModuleName() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [appKey, setAppKey] = useState<AppKey>()
  const [moduleKey, setModuleKey] = useState<string | null>(null)

  useEffect(() => {
    if (pathname === routeMap.root) navigate(routeMap.home, { replace: true })

    const matcher = /^\/(\w+)(?:\/(\w+))?\/?/
    const [, appKey, moduleKey] = pathname.match(matcher) ?? []
    setAppKey(appKey as AppKey)
    setModuleKey(moduleKey ?? null)
  }, [navigate, pathname])

  return {
    appKey,
    moduleKey,
  }
}

export default useModuleName
