import React from 'react'
import PropTypes from 'prop-types'
import trae from 'trae'

const METHODS = ['get', 'put', 'patch', 'post', 'head', 'delete']
const WITH_BODY = ['put', 'patch', 'post']

const BODYTYPES = ['arrayBuffer', 'blob', 'formData', 'json', 'text', 'raw']
const MODES = ['same-origin', 'no-cors', 'cors', 'navigate']
const CREDENTIALS = ['omit', 'same-origin', 'include']
const CACHES = [
  'default',
  'no-store',
  'reload',
  'no-cache',
  'force-cache',
  'only-if-cached',
]

export default class Trae extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    method: PropTypes.oneOf(METHODS),
    bodyType: PropTypes.oneOf(BODYTYPES),
    mode: PropTypes.oneOf(MODES),
    credentials: PropTypes.oneOf(CREDENTIALS),
    cache: PropTypes.oneOf(CACHES),
    body: PropTypes.any,
    params: PropTypes.object,
    headers: PropTypes.object,
  }

  static defaultProps = {
    method: 'get',
    bodyType: 'json',
    mode: 'cors',
    credentials: 'omit',
    cache: 'default',
    body: {},
    params: {},
    headers: {},
  }

  state = {
    loading: true,
    error: false,
    data: {},
  }

  componentDidMount() {
    trae
      [this.props.method](...this.requestParams())
      .then(response => this.setState({ loading: false, ...response }))
      .catch(error => this.setState({ loading: false, error, ...error }))
  }

  requestParams() {
    const {
      url,
      method,
      bodyType,
      mode,
      credentials,
      cache,
      body,
      params,
      headers,
    } = this.props

    const config = { bodyType, mode, credentials, cache, params, headers }

    return WITH_BODY.includes(method) ? [url, body, config] : [url, config]
  }

  render() {
    return this.props.children(this.state)
  }
}
