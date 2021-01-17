import { API_CALL } from 'Constants/api'

export const apiCall = fields => ({
  type: API_CALL,
  fields,
})
