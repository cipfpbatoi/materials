/*
 * mock-api.js — Simula la API de https://jsonplaceholder.typicode.com con datos locales
 * para que las demos funcionen en redes que bloquean ese dominio (p. ej. la de Conselleria).
 *
 * Intercepta fetch() y XMLHttpRequest SOLO para URLs de jsonplaceholder; el resto de
 * peticiones salen a la red normalmente. Los datos se leen de ./data/<tabla>.json
 * (datos originales de jsonplaceholder, licencia MIT, (c) typicode).
 *
 * Soporta peticiones GET del tipo:
 *   /posts               -> todos los registros
 *   /posts/5             -> el registro con id 5 (404 si no existe)
 *   /posts?userId=3      -> filtrado por cualquier campo (se pueden combinar con &)
 * Las peticiones POST, PUT, PATCH y DELETE se responden como lo hace jsonplaceholder
 * (devuelve el objeto enviado, pero no se guarda nada).
 *
 * El código de los alumnos NO cambia: sigue haciendo las peticiones a jsonplaceholder.
 */
(function () {
  const API = 'https://jsonplaceholder.typicode.com'
  const DATA_DIR = new URL('./data/', document.currentScript.src).href
  const DELAY = 400 // ms, para que se note que la petición es asíncrona
  const STATUS_TEXT = { 200: 'OK', 201: 'Created', 404: 'Not Found' }
  const cache = {}
  const nativeFetch = window.fetch.bind(window)
  const NativeXHR = window.XMLHttpRequest

  function esDeLaApi(url) {
    return String(url).startsWith(API)
  }

  async function cargaTabla(tabla) {
    if (!cache[tabla]) {
      const resp = await nativeFetch(DATA_DIR + tabla + '.json')
      cache[tabla] = resp.ok ? await resp.json() : null
    }
    return cache[tabla]
  }

  // Devuelve { status, body } igual que lo haría jsonplaceholder
  async function responde(method, url, body) {
    await new Promise((resolve) => setTimeout(resolve, DELAY))
    const u = new URL(url)
    const [tabla, id] = u.pathname.split('/').filter(Boolean)
    const datos = tabla ? await cargaTabla(tabla) : null
    if (!datos) return { status: 404, body: {} }
    method = (method || 'GET').toUpperCase()
    let enviado = {}
    try { enviado = body ? JSON.parse(body) : {} } catch (e) { enviado = {} }

    if (method === 'GET') {
      if (id) {
        const reg = datos.find((d) => String(d.id) === id)
        return reg ? { status: 200, body: reg } : { status: 404, body: {} }
      }
      let resultado = datos
      for (const [campo, valor] of u.searchParams) {
        resultado = resultado.filter((d) => String(d[campo]) === valor)
      }
      return { status: 200, body: resultado }
    }
    if (method === 'POST') return { status: 201, body: { ...enviado, id: datos.length + 1 } }
    const reg = datos.find((d) => String(d.id) === id)
    if (!reg) return { status: 404, body: {} }
    if (method === 'PUT') return { status: 200, body: { ...enviado, id: reg.id } }
    if (method === 'PATCH') return { status: 200, body: { ...reg, ...enviado } }
    if (method === 'DELETE') return { status: 200, body: {} }
    return { status: 404, body: {} }
  }

  // ---- fetch ----
  window.fetch = async function (input, init = {}) {
    const url = typeof input === 'string' ? input : input.url
    if (!esDeLaApi(url)) return nativeFetch(input, init)
    const { status, body } = await responde(init.method, url, init.body)
    return new Response(JSON.stringify(body), {
      status,
      statusText: STATUS_TEXT[status] || '',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  }

  // ---- XMLHttpRequest ----
  class MockXHR extends EventTarget {
    constructor() {
      super()
      this.readyState = 0
      this.status = 0
      this.statusText = ''
      this.responseText = ''
      this.response = ''
      this.responseType = ''
      this.timeout = 0
      this._native = null
    }
    _fire(tipo) {
      const ev = new ProgressEvent(tipo)
      this.dispatchEvent(ev)
      if (typeof this['on' + tipo] === 'function') this['on' + tipo](ev)
    }
    _setState(n) {
      this.readyState = n
      this._fire('readystatechange')
    }
    open(method, url, ...rest) {
      this._method = method
      this._url = url
      if (!esDeLaApi(url)) {
        // Petición a otra URL: usamos el XMLHttpRequest real y copiamos su estado
        const x = (this._native = new NativeXHR())
        const sync = () => {
          for (const p of ['readyState', 'status', 'statusText', 'responseText', 'response']) {
            try { this[p] = x[p] } catch (e) {}
          }
        }
        for (const tipo of ['readystatechange', 'load', 'error', 'abort', 'timeout', 'loadend', 'progress']) {
          x.addEventListener(tipo, () => { sync(); this._fire(tipo) })
        }
        x.open(method, url, ...rest)
        return
      }
      this._setState(1)
    }
    setRequestHeader(nombre, valor) {
      if (this._native) this._native.setRequestHeader(nombre, valor)
    }
    getResponseHeader(nombre) {
      if (this._native) return this._native.getResponseHeader(nombre)
      return nombre.toLowerCase() === 'content-type' ? 'application/json; charset=utf-8' : null
    }
    getAllResponseHeaders() {
      return this._native ? this._native.getAllResponseHeaders() : 'content-type: application/json; charset=utf-8\r\n'
    }
    abort() {
      if (this._native) return this._native.abort()
      this._abortado = true
      this._fire('abort')
      this._fire('loadend')
    }
    send(body) {
      if (this._native) {
        this._native.timeout = this.timeout
        this._native.responseType = this.responseType
        return this._native.send(body)
      }
      this._setState(2)
      responde(this._method, this._url, body).then(({ status, body }) => {
        if (this._abortado) return
        this._setState(3)
        this.status = status
        this.statusText = STATUS_TEXT[status] || ''
        this.responseText = JSON.stringify(body)
        this.response = this.responseType === 'json' ? body : this.responseText
        this._setState(4)
        this._fire('load')
        this._fire('loadend')
      })
    }
  }
  window.XMLHttpRequest = MockXHR

  // Aviso visible para que nadie piense que los datos vienen de internet
  window.addEventListener('DOMContentLoaded', () => {
    const aviso = document.createElement('p')
    aviso.textContent = 'ℹ️ Demo con datos locales: las peticiones a jsonplaceholder se responden desde el propio servidor de los apuntes.'
    aviso.style.cssText = 'font-size:0.8em;color:#666;margin:0 0 0.5em'
    document.body.prepend(aviso)
  })
})()
