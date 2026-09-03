/**
 * Marcador visível de seção ainda não construída.
 * Some sozinho assim que os dados existirem — e serve de lembrete
 * de que o site não está pronto para ser divulgado.
 *
 * Apague este componente quando todas as seções estiverem prontas.
 */
export function EmptyState({ step, file }: { step: string; file: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-6 py-10 text-sm text-muted">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-deep">{step}</p>
      <p className="mt-2">
        Nada aqui ainda. Preencha <code className="text-ink">{file}</code>.
      </p>
    </div>
  )
}
