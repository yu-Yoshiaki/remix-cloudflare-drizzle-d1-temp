import antfu from '@antfu/eslint-config'
import tailwindcss from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    ignores: ['./functions/**/*'],
  },
  ...tailwindcss.configs['flat/recommended'],
)
