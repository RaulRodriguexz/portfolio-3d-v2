import { Section } from '../components/layout/Section'
import { EmptyState } from '../components/ui/EmptyState'
import { ProjectCard } from '../components/ui/ProjectCard'
import { projects } from '../data/projects'

/**
 * Seção 3 do PRD — a seção que converte.
 *
 * PASSO 5 — criar o componente <ProjectCard /> em src/components/ui/ e
 * renderizar a lista aqui num grid de 2 colunas no desktop.
 */
export function Projects() {
  return (
    <Section id="projects" eyebrow="Work" title="Selected work">
      {projects.length === 0 ? (
        <EmptyState step="Passo 5" file="src/data/projects.ts" />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Section>
  )
}
