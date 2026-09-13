import { Section } from '../components/layout/Section'
import { ProjectCard } from '../components/ui/ProjectCard'
import { projects } from '../data/projects'

/**
 * Seção 3 do PRD — a seção que converte.
 *
 * A grade é de duas colunas, e os cards com `featured` ocupam as duas
 * (`md:col-span-2`, no próprio ProjectCard). São **dois** destaques desde a
 * D-81: com um só, sobravam três compactos e um ficava órfão na última linha.
 */
export function Projects() {
  return (
    <Section id="projects" eyebrow="Work" title="Selected work">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
