import { useEffect, useRef, useState } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

/**
 * Botão de e-mail que também copia.
 *
 * Clicar abre o cliente de e-mail, como qualquer link `mailto:`. O botão ao
 * lado copia o endereço — porque metade das pessoas não usa cliente de e-mail
 * no navegador, e ficar sem reação ao clicar é a forma mais silenciosa de
 * perder um contato.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  // o ímã pega a pílula inteira, não cada metade (M-27)
  const magnetico = useMagnetic<HTMLDivElement>()
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // sem permissão de área de transferência: o link mailto ainda funciona
    }
  }

  return (
    <div
      ref={magnetico}
      className="inline-flex items-stretch overflow-hidden rounded-full bg-primary-deep text-white transition-transform duration-200"
    >
      <a
        href={`mailto:${email}`}
        className="px-6 py-3 text-sm transition-colors duration-200 hover:bg-primary"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="relative border-l border-white/25 px-4 text-sm transition-colors duration-200 hover:bg-primary"
        aria-label={copied ? 'Email copied' : 'Copy email address'}
      >
        <span
          className={`block transition-[opacity,transform] duration-200 ${
            copied ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          Copy
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-0 grid place-items-center transition-[opacity,transform] duration-200 ${
            copied ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
          }`}
        >
          Copied
        </span>
      </button>
      {/* anúncio para leitor de tela, fora do fluxo visual */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  )
}
