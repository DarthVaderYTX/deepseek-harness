import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'simple-demo-plugin'
export const inject = ['tools', 'systemPrompt'] as const

const TOOL_PREAMBLE = [
  'Before calling any tool, write one or two sentences for the user in plain language:',
  'what you are about to do and why.',
  'Put that explanation in the assistant text of the same response, immediately before the tool call.',
].join(' ')

export function apply(ctx: Context) {
  ctx.effect(() => ctx.systemPrompt.section({
    name: 'simple-demo:tool-preamble',
    order: 50,
    text: TOOL_PREAMBLE,
  }))

  ctx.tools.register(defineTool({
    name: 'ping',
    description: 'Return pong.',
    parameters: {},
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute() {
      return 'pong'
    },
  }))
}
