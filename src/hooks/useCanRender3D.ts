import { useEffect, useState } from 'react'
import { LARGURA_MINIMA } from './useTelaLarga'

/**
 * RNF-04 — decide se vale montar a cena 3D.
 *
 * Retorna false quando: não há WebGL, o visitante pediu menos movimento, ou a
 * tela é estreita demais (no mobile o hero não precisa de canvas — economiza
 * bateria e banda, e o PNG estático resolve).
 *
 * O limiar de tela estreita não é mais escrito aqui: ele veio para o
 * `LARGURA_MINIMA` na D-69, para o projeto ter **uma** definição de tela
 * pequena, e não duas que possam divergir. O comportamento é o mesmo de antes.
 */
export function useCanRender3D() {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < LARGURA_MINIMA) return

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
