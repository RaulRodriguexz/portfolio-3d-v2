import { Suspense, lazy } from 'react'
import { useCanRender3D } from '../../hooks/useCanRender3D'

// RNF-02 / RNF-03: o Three.js vive num chunk próprio, buscado só depois de o
// HTML e o texto do hero já estarem na tela.
const HeroScene = lazy(() => import('./HeroScene'))

/**
 * O visual do hero: gradiente de fundo, e por cima ou a cena 3D, ou o Memoji
 * como imagem comum.
 *
 * RNF-04 — a imagem é o caminho padrão, não o plano B envergonhado: ela é o que
 * aparece no celular, sem WebGL, e com `prefers-reduced-motion`. O site
 * funciona inteiro sem uma linha de Three.js.
 */
export function HeroVisual() {
  const canRender3D = useCanRender3D()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* halo de cor por trás de tudo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_38%,rgba(140,98,172,0.20),transparent_58%),radial-gradient(ellipse_at_12%_88%,rgba(110,17,176,0.08),transparent_52%)]" />

      {canRender3D ? (
        <Suspense fallback={null}>
          {/* o fade evita o "pop" quando o chunk 3D termina de carregar */}
          <div className="absolute inset-0 animate-[sceneIn_900ms_ease-out_forwards] opacity-0">
            <HeroScene />
          </div>
        </Suspense>
      ) : (
        <img
          src="/images/memoji.webp"
          alt=""
          className="absolute bottom-0 left-1/2 w-[62%] max-w-[320px] -translate-x-1/2 opacity-95 sm:w-[40%] sm:max-w-[400px]"
          loading="eager"
          decoding="async"
        />
      )}

      {/* degradê inferior, para a próxima seção respirar */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />

      <style>{`@keyframes sceneIn { to { opacity: 1 } }`}</style>
    </div>
  )
}
