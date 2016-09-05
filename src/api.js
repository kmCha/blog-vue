import Vue from 'vue'

export function fetchData (url, params) {
  return Vue.http.get(url, {
    params
  })
}
