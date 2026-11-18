import { atom, read, update } from 'claude-code'
import type { Engine, Register } from 'claude-code'

import type { SdlcState } from '../types'

// Read-only: this mod only reads docs/sdlc/STATE.md. It never touches tool
// calls, the network, or a model.
const STATE_FILE = 'docs/sdlc/STATE.md'

const current = atom({ plugin: 'vibe-sdlc-status', key: 'state' } as const, null, {
  shape: 'state-1',
})
const isHidden = atom({ plugin: 'vibe-sdlc-status', key: 'isHidden' } as const, false)

const field = (text: string, name: string): string => {
  const line = text.split('\n').find(l => l.trim().startsWith(`- ${name}:`))
  if (line === undefined) return '?'
  return line
    .slice(line.indexOf(':') + 1)
    .replace(/<!--.*?-->/g, '')
    .trim() || '?'
}

// Counts non-empty bullet lines under a "## <heading>" until the next heading.
const countItems = (text: string, heading: string): number => {
  const lines = text.split('\n')
  const start = lines.findIndex(l => l.trim().toLowerCase().startsWith(`## ${heading}`))
  if (start === -1) return 0
  let n = 0
  for (const l of lines.slice(start + 1)) {
    const t = l.trim()
    if (t.startsWith('## ')) break
    if (/^- \[x\]/i.test(t)) continue
    if (/^- (\[ \] )?\S/.test(t)) n += 1
  }
  return n
}

const parse = (text: string): SdlcState => ({
  phase: field(text, 'phase'),
  status: field(text, 'status'),
  tier: field(text, 'tier'),
  autonomy: field(text, 'autonomy'),
  nextStep: field(text, 'next_step'),
  openRisks: countItems(text, 'open risks'),
  operatorTodo: countItems(text, 'operator todo'),
  waiting: countItems(text, 'waiting for user'),
})

async function refresh($: Engine): Promise<SdlcState | null> {
  const root = await $.session.root()
  const path = `${root}/${STATE_FILE}`
  const found = (await $.fs.exists(path))
    ? parse(await $.fs.read(path).catch(() => ''))
    : null
  await update($, current, () => found)
  return found
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'sdlc-status',
      description: 'Show the vibe-sdlc STATE summary (phase, tier, status, next step)',
    })
    await refresh($)
    return next(e)
  })

  // STATE.md usually changes during a turn; re-read once the turn ends.
  on('turn.complete', async ($, e, next) => {
    await refresh($)
    return next(e)
  })

  on('command.run', { command: 'sdlc-status' }, async $ => {
    const s = await refresh($)
    await update($, isHidden, () => false)
    if (s === null) {
      return {
        text: `No ${STATE_FILE} in this project. Start with /vibe-sdlc:sdlc to create it.`,
      }
    }
    return {
      text: [
        `vibe-sdlc · phase ${s.phase}`,
        `status: ${s.status}`,
        `tier: ${s.tier} · autonomy: ${s.autonomy}`,
        `next step: ${s.nextStep}`,
        `open risks: ${s.openRisks} · waiting for you: ${s.waiting} · operator todo: ${s.operatorTodo}`,
      ].join('\n'),
    }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const s = await read($, current)
    if (e.props.hasSurvey || s === null || (await read($, isHidden))) {
      return next(e)
    }
    const { Box, Button, Text } = $.ui.resolve(e)
    const flags = [
      s.waiting > 0 ? `${s.waiting} chờ xác nhận` : '',
      s.openRisks > 0 ? `${s.openRisks} rủi ro mở` : '',
      s.operatorTodo > 0 ? `${s.operatorTodo} việc của bạn` : '',
    ].filter(Boolean)
    return (
      <Box>
        <Text dimColor>
          vibe-sdlc · phase {s.phase} · {s.tier} · {s.status}
          {flags.length > 0 ? ` · ${flags.join(' · ')}` : ''}{' '}
        </Text>
        <Button key="hide" label="Hide" onPress={() => update($, isHidden, () => true)} />
      </Box>
    )
  })
}
