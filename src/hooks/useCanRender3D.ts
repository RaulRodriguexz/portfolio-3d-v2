import { useEffect, useState } from 'react'

/**
 * RNF-04 — decide se vale montar a cena 3D.
 *
 * Retorna false quando: não há WebGL, o visitante pediu menos movimento, ou a
 * tela é estreita demais (no mobile o hero não precisa de canvas — economiza
 * bateria e banda, e o PNG estático resolve).
 */
export function useCanRender3D() {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 640) return

    let supported = false
    try {
      const canvas = document.createElement('canvas')
      supported = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
    } catch {
      supported = false
    }

    setCanRender(supported)
  }, [])

  return canRender
}
