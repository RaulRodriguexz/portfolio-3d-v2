import { Section } from '../components/layout/Section'
import { EmptyState } from '../components/ui/EmptyState'
import { stackGroups, alsoStudied } from '../data/stack'
import { Tag } from '../components/ui/Tag'
import { Marquee } from '../components/ui/Marquee'

/** Seção 4 do PRD — responde "ele sabe o que eu preciso?". */
export function Stack() {
  return (
    <Section id="stack" eyebrow="Stack" title="What I work with">
      {stackGroups.length === 0 ? (
        <EmptyState step="Passo 6" file="src/data/stack.ts" />
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {stackGroups.map((group) => (
            <div key={group.label} className="space-y-3">
              <h3 className="text-lg font-bold">{group.label}</h3>
              <p className="text-sm leading-relaxed text-muted">{group.summary}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {stackGroups.length > 0 && (
        <>
          <div className="mt-14 border-y border-line/60">
            <Marquee items={stackGroups.flatMap((g) => g.items)} />
          </div>
          <p className="mt-6 font-mono text-xs text-muted/80">{alsoStudied}</p>
        </>
      )}
    </Section>
  )
}
