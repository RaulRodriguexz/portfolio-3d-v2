import { useRef } from 'react'
import type { Project } from '../../data/projects'
import { Tag } from './Tag'

/**
 * Card de projeto (RF-04) com o brilho que segue o cursor (M-6).
 *
 * O brilho é um pseudo-elemento com `radial-gradient` posicionado por duas
 * variáveis CSS. O JavaScript só escreve dois números no elemento — nada de
 * state do React, nada de re-render: mover o mouse sobre um card não pode
 * reconstruir a árvore.
 */
export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // posição do brilho (M-6)
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)

    // inclinação 3D (M-20): no máximo 3.5°, e ao contrário do cursor, como se
    // o card fosse uma placa apoiada num pivô central. Mais que isso vira
    // brinquedo e atrapalha a leitura.
    const px = x / rect.width - 0.5
    const py = y / rect.height - 0.5
    el.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt spotlight group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-[border-color] duration-300 hover:border-primary/60 sm:p-8 ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <header className="flex flex-wrap items-center gap-3">
        <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
        {project.featured && (
          <span className="rounded-full bg-primary/12 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-primary-deep">
            Featured
          </span>
        )}
      </header>

      <dl className="max-w-[68ch] space-y-3 text-sm leading-relaxed">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
            Problem
          </dt>
          <dd className="mt-1 text-ink/85">{project.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
            Built
          </dt>
          <dd className="mt-1 text-ink/85">{project.solution}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
            Impact
          </dt>
          <dd className="mt-1 font-bold text-primary-deep">{project.impact}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>

      {(project.repo || project.demo) && (
        <div className="mt-auto flex gap-6 pt-2 text-sm">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="text-primary-deep transition-transform duration-200 hover:translate-x-0.5"
            >
              Live demo →
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors duration-200 hover:text-primary-deep"
            >
              Code →
            </a>
          )}
        </div>
      )}
    </article>
  )
}
