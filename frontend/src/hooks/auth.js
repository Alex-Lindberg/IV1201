import { atomsWithMutation } from 'jotai-tanstack-query'
import { login } from '../api'

const [, handleLogin] = atomsWithMutation(() => ({
  mutationKey: ['posts'],
  mutationFn: async ({ username, password }) => {
    return login({username, password})
  },
}))

export default handleLogin