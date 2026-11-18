import { expect, test } from 'claude-code/testing'

const STATE = `# STATE — demo
- updated: 2026-11-18
- phase: 1 (Requirements) <!-- 0..10 -->
- status: CHỜ XÁC NHẬN <!-- x -->
- tier: L <!-- S | M | L -->
- autonomy: delegate
- next_step: Approve the PRD

## Open risks (severity — risk — owner — due)
- High — no backups yet — user — 2026-11-20

## Waiting for user confirmation
- PRD v1

## Operator todo (things only the user can do)
- [ ] Create Supabase project
- [x] Buy domain
`

const BAND = {
  plugin: 'vibe-sdlc-status',
  component: 'AbovePrompt',
  props: { hasSurvey: false, isWorking: false },
} as const

function engine(on: any, hasFile: boolean) {
  on('command.register', () => ({ value: { command: 'sdlc-status' } }))
  on('session.start', (_: unknown, e: any) => ({ cwd: e.cwd }))
  on('session.root', () => ({ value: '/proj' }))
  on('fs.exists', () => ({ value: hasFile }))
  on('fs.read', () => ({ value: STATE }))
  // Stands for the engine's own drawing when the mod yields with next(e).
  on('ui.render', ($: any, e: any) => {
    const { Text } = $.ui.resolve(e)
    return <Text>engine</Text>
  })
}

test('command summarises STATE.md', async ($, on) => {
  engine(on, true)
  await $.session.start({ cwd: '/proj', surface: 'terminal', isInteractive: true })
  const out = await $.command.run({ command: 'sdlc-status' })
  expect(out.text).toContain('phase 1 (Requirements)')
  expect(out.text).toContain('tier: L · autonomy: delegate')
  expect(out.text).toContain('open risks: 1 · waiting for you: 1 · operator todo: 1')
})

test('band shows phase and flags', async ($, on) => {
  engine(on, true)
  await $.session.start({ cwd: '/proj', surface: 'terminal', isInteractive: true })
  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  const row = await ui.find({ type: 'Text', text: /vibe-sdlc/ })
  expect(row?.text).toContain('phase 1 (Requirements) · L · CHỜ XÁC NHẬN')
  expect(row?.text).toContain('1 rủi ro mở')
  await ui.unmount()
})

test('no STATE.md: command explains, band stays out', async ($, on) => {
  engine(on, false)
  await $.session.start({ cwd: '/proj', surface: 'terminal', isInteractive: true })
  const out = await $.command.run({ command: 'sdlc-status' })
  expect(out.text).toContain('No docs/sdlc/STATE.md')
  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect((await ui.find({ type: 'Text' }))?.text).toBe('engine')
  await ui.unmount()
})
