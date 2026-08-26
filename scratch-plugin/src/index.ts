import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'simple-demo-plugin'
export const inject = ['tools'] as const

export function apply(ctx: Context) {
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

  ctx.on('tools/pre-execute', async (exec, next) => {
    console.log(`[simple-demo-plugin] before tool: ${exec.name}`)
    return next()
  })
}
