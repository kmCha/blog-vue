import Vue from 'vue'
import Vuex from 'vuex'
import { fetchData } from '../apis'

Vue.use(Vuex)

var state = {
  articles: '',
  categories: '',
  tags: '',
  loading: true,
  windowWidth: 0,
  windowHeight: 0,
  headerFixed: false
}

var mutations = {
  setArticles: (state, articles) => {
    state.articles = articles
  },
  setCategories: (state, categories) => {
    state.categories = categories
  },
  setTags: (state, tags) => {
    state.tags = tags
  },
  startLoading: state => {
    state.loading = true
  },
  finishLoading: state => {
    state.loading = false
  },
  setWindowSize: (state, size) => {
    state.windowHeight = size.height
    state.windowWidth = size.width
  },
  fixHeader: (state) => {
    state.headerFixed = true
  },
  unfixHeader: (state) => {
    state.headerFixed = false
  },
  setPage: (state, page) => {
    state.onPage = page
  }
}

var actions = {
  getArticles: ({commit}) => {
    return fetchData('https://chamajiuxi.wilddogio.com/blog/posts.json', {
      orderBy: '"date"',
      limitToLast: 100
    }).then(res => {
      commit('setArticles', res.json())
    })
  },
  getCategories: ({commit}) => {
    return fetchData('https://chamajiuxi.wilddogio.com/blog/categories.json')
    .then(res => {
      // 解决野狗返回的json数组长度为1时变成key为0的对象而不是数组的问题
      let categories = res.json()
      for (let key in categories) {
        if (!categories[key].length && categories[key].length !== 0) {
          categories[key] = [categories[key][0]]
        }
      }
      commit('setCategories', categories)
    })
  },
  getTags: ({commit}) => {
    return fetchData('https://chamajiuxi.wilddogio.com/blog/tags.json')
    .then(res => {
      let tags = res.json()
      commit('setTags', tags)
    })
  }
}

var getters = {
  count: state => state.count,
  articlesLength: state => {
    let count = 0
    for (let key in state.articles) {
      if (key) count++
    }
    return count
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
