export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted transition-colors duration-200 hover:border-primary hover:text-primary-deep">
      {children}
    </span>
  )
}
