"use client"

import { useActionState, useEffect, useRef } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { unlock, type UnlockState } from "@/app/actions/secret"

// Speech bubble with a passphrase field. `tail` adds the pointer at the top center, toward the face above it.
export default function UnlockForm({ tail = false, autoFocus = false }: { tail?: boolean; autoFocus?: boolean }) {
  const [state, action, pending] = useActionState<UnlockState, FormData>(unlock, {})
  const shake = useAnimationControls()
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!state.at) return
    shake.start({ x: [0, -10, 9, -6, 4, 0], transition: { duration: 0.45 } })
    input.current?.select()
  }, [state.at, shake])

  return (
    <motion.form
      action={action}
      animate={shake}
      className="relative w-[min(300px,calc(100vw-32px))] rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)]"
    >
      {tail && (
        <span className="absolute -top-[7px] left-1/2 -ml-1.5 w-3 h-3 rotate-45 bg-[var(--bg)] border-l border-t border-[var(--border)]" />
      )}
      <p className="text-sm mb-3 text-center">{state.error ? state.error : "合言葉は？"}</p>
      <div className="flex gap-2">
        <input
          ref={input}
          name="passphrase"
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoFocus={autoFocus}
          required
          className="min-w-0 flex-1 rounded-full bg-transparent border border-[var(--border)] px-4 py-2 text-base focus:border-[var(--accent)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="開ける"
          className="shrink-0 w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center disabled:opacity-50"
        >
          {pending ? "…" : "→"}
        </button>
      </div>
    </motion.form>
  )
}
