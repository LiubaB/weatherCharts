import get from 'lodash/get'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import assign from 'lodash/assign'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import axios from 'axios'
import { API_CALL } from 'Constants/api'

export const ApiService = {
  apiCall: (
    url = '',
    endpoint = '',
    method = 'GET',
    query = {},
    headers = {},
    qsParams = {}
  ) => {
    const HTTPMethod = method.toLowerCase()

    const api = axios.create({
      baseURL: url,
      headers,
      params: qsParams,
    })

    const body = method === 'delete' ? { data: query } : query

    return new Promise((resolve, reject) => {
      api[HTTPMethod](endpoint, body)
        .then(data => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}

const nextAction = (action, data) => {
  const next = merge({}, action, data)
  delete next[API_CALL]
  return next
}

export default () => next => action => {
  if (action.type !== API_CALL || !action.fields) return next(action)
  const {
    url,
    endpoint,
    headers,
    method,
    query,
    types,
    qsParams,
    callback,
  } = action.fields

  const signature = Date.now()

  const completeHeaders = assign(
    isEmpty(query) && { 'Content-Type': 'application/json' },
    headers
  )

  const fsaFields = pick(action.fields, 'payload', 'error', 'meta')

  const isLoadRequest =
    !method ||
    method.toUpperCase() === 'GET' ||
    method.toUpperCase() === 'PATCH' ||
    method.toUpperCase() === 'POST'

  next(
    nextAction(fsaFields, {
      type: types.REQUEST,
      meta: merge(
        { signature },
        isLoadRequest && { endpoint, isRequest: true }
      ),
    })
  )

  const onError = error => {
    console.log('onError =====>>>', error)

    const data = {
      payload: error,
      type: types.FAILURE,
      meta: {
        signature,
        httpCode: error.status,
        endpoint,
      },
      error: true,
    }

    if (isFunction(callback)) callback(get(error, 'response.data', error))
    next(nextAction(fsaFields, data))
    return data
  }

  const onSuccess = response => {
    const meta = merge(
      { signature },
      isLoadRequest && { endpoint, isSuccess: true }
    )
    const payload = get(response, 'data')
    const data = { meta, payload, type: types.SUCCESS }

    if (isFunction(callback)) {
      callback(null, payload)
    }

    next(nextAction(fsaFields, data))

    return data
  }

  const apiRequest = ApiService.apiCall(
    url,
    endpoint,
    method,
    query,
    completeHeaders,
    qsParams
  )

  return apiRequest
    .then(onSuccess, onError)
    .catch(error => console.error('Request error', error))
}
