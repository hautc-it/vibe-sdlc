export type SdlcState = {
  phase: string
  status: string
  tier: string
  autonomy: string
  nextStep: string
  openRisks: number
  operatorTodo: number
  waiting: number
}

declare module 'claude-code' {
  interface PluginState {
    'vibe-sdlc-status': { state: SdlcState | null; isHidden: boolean }
  }
}
