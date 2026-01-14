import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Editor } from '@monaco-editor/react'

type CodeEditorProps = {
  className?: string
  language?: string
  onLanguageChange?: (language: string) => void
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  showRunner?: boolean
  showLanguagePicker?: boolean
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  className,
  language: languageProp,
  onLanguageChange,
  value,
  defaultValue = '// Start coding with night owls...',
  onChange,
  showRunner = true,
  showLanguagePicker = true,
}) => {
  const isLanguageControlled = languageProp !== undefined
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<string>(defaultValue)

  const [internalLanguage, setInternalLanguage] = useState<string>(languageProp ?? 'javascript')
  const selectedLanguage = isLanguageControlled ? (languageProp as string) : internalLanguage

  const codeValue = isControlled ? (value as string) : internalValue

  const [runId, setRunId] = useState(0)
  const [runCode, setRunCode] = useState<string | null>(null)
  const [outputLines, setOutputLines] = useState<string[]>([])
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const languageOptions = useMemo(
    () => [
      { id: 'javascript', label: 'JavaScript' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'json', label: 'JSON' },
      { id: 'html', label: 'HTML' },
      { id: 'css', label: 'CSS' },
      { id: 'markdown', label: 'Markdown' },
      { id: 'python', label: 'Python' },
      { id: 'java', label: 'Java' },
      { id: 'csharp', label: 'C#' },
      { id: 'cpp', label: 'C++' },
      { id: 'go', label: 'Go' },
      { id: 'rust', label: 'Rust' },
      { id: 'php', label: 'PHP' },
      { id: 'ruby', label: 'Ruby' },
      { id: 'sql', label: 'SQL' },
      { id: 'yaml', label: 'YAML' },
    ],
    [],
  )

  const canRunInBrowser = selectedLanguage === 'javascript'

  const srcDoc = useMemo(() => {
    if (!showRunner) return ''
    if (runCode === null) return ''

    const safeCode = (runCode ?? '').replace(/<\//g, '<\\/')
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { margin: 0; padding: 12px; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: #0b1220; color: #e5e7eb; }
      #app { padding: 8px; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script>
      (function () {
        const send = (type, payload) => parent.postMessage({ __nightOwls: true, type, payload }, '*');
        const toText = (v) => {
          try {
            if (typeof v === 'string') return v;
            if (v instanceof Error) return v.stack || v.message;
            return JSON.stringify(v, null, 2);
          } catch {
            return String(v);
          }
        };

        const wrap = (level) => (...args) => send('log', { level, text: args.map(toText).join(' ') });
        console.log = wrap('log');
        console.warn = wrap('warn');
        console.error = wrap('error');

        window.addEventListener('error', (e) => {
          send('error', { message: e.message || 'Runtime error', stack: e.error && e.error.stack });
        });
        window.addEventListener('unhandledrejection', (e) => {
          const reason = e.reason;
          send('error', { message: toText(reason), stack: reason && reason.stack });
        });

        send('status', { message: 'Running…' });
      })();
    </script>
    <script type="module">
      try {
        ${safeCode}
        parent.postMessage({ __nightOwls: true, type: 'status', payload: { message: 'Done' } }, '*');
      } catch (err) {
        parent.postMessage({ __nightOwls: true, type: 'error', payload: { message: err?.message || String(err), stack: err?.stack } }, '*');
      }
    </script>
  </body>
</html>`
  }, [runCode, showRunner])

  useEffect(() => {
    if (!isLanguageControlled) return
    setInternalLanguage(languageProp as string)
  }, [isLanguageControlled, languageProp])

  useEffect(() => {
    if (!showRunner) return

    const handler = (event: MessageEvent) => {
      const iframeWindow = iframeRef.current?.contentWindow
      if (!iframeWindow || event.source !== iframeWindow) return

      const data = event.data as
        | { __nightOwls?: boolean; type?: string; payload?: any }
        | undefined

      if (!data?.__nightOwls) return

      if (data.type === 'log') {
        const level = data.payload?.level ?? 'log'
        const text = data.payload?.text ?? ''
        setOutputLines((prev) => [...prev, `[${level}] ${text}`])
        return
      }

      if (data.type === 'status') {
        const message = data.payload?.message ?? ''
        setOutputLines((prev) => [...prev, message])
        return
      }

      if (data.type === 'error') {
        const message = data.payload?.message ?? 'Error'
        const stack = data.payload?.stack
        setOutputLines((prev) => [...prev, `[error] ${message}`, ...(stack ? [String(stack)] : [])])
      }
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [showRunner])

  return (
    <div className={'h-full w-full min-h-[280px] flex flex-col ' + (className ?? '')}>
      {showRunner && (
        <div className='flex items-center justify-between gap-3 px-3 py-2 border-b border-white/10 bg-black/20'>
          <div className='flex items-center gap-3 min-w-0'>
            <div className='text-sm text-white/80 shrink-0'>Editor</div>
            {showLanguagePicker && (
              <label className='flex items-center gap-2 min-w-0'>
                <span className='text-xs text-white/60 shrink-0'>Language</span>
                <select
                  className='text-sm px-2 py-1 rounded-md bg-black/30 border border-white/10 text-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/60'
                  value={selectedLanguage}
                  onChange={(e) => {
                    const nextLang = e.target.value
                    if (!isLanguageControlled) setInternalLanguage(nextLang)
                    onLanguageChange?.(nextLang)
                  }}
                >
                  {languageOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <button
              className='text-sm px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 border border-white/10'
              onClick={() => setOutputLines([])}
              type='button'
            >
              Clear
            </button>
            <button
              className='text-sm px-3 py-1.5 rounded-md bg-indigo-500/90 hover:bg-indigo-500 text-white'
              onClick={() => {
                setOutputLines([])
                if (!canRunInBrowser) {
                  setRunCode(null)
                  setOutputLines([
                    `Runner supports JavaScript only right now. Selected: ${selectedLanguage}.`,
                    'Language selection still changes syntax highlighting.',
                  ])
                  return
                }

                setRunCode(codeValue ?? '')
                setRunId((x) => x + 1)
              }}
              type='button'
            >
              Run
            </button>
          </div>
        </div>
      )}

      <div className='flex-1 min-h-0'>
        <Editor
          height='100%'
          defaultLanguage={selectedLanguage}
          language={selectedLanguage}
          theme='vs-dark'
          value={codeValue}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            tabSize: 2,
          }}
          onChange={(nextValue) => {
            const next = nextValue ?? ''
            if (!isControlled) setInternalValue(next)
            onChange?.(next)
          }}
        />
      </div>

      {showRunner && (
        <div className='border-t border-white/10 bg-black/20'>
          <div className='px-3 py-2 text-sm text-white/80'>Output</div>
          <div className='px-3 pb-3'>
            <pre className='w-full h-40 md:h-48 overflow-auto rounded-lg border border-white/10 bg-black/30 p-3 text-xs text-white/80 whitespace-pre-wrap break-words'>
              {outputLines.length ? outputLines.join('\n') : 'Click Run to see output (console.log, warnings, errors).'}
            </pre>
            {runId > 0 && runCode !== null && (
              <iframe
                key={runId}
                ref={iframeRef}
                srcDoc={srcDoc}
                sandbox='allow-scripts'
                className='hidden'
                title='code-runner'
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeEditor
