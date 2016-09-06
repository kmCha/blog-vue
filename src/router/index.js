// import Articles from '../containers/Articles'
// import Categories from '../containers/Categories'
// import Category from '../containers/Category'
// import Achieves from '../containers/Achieves'
// import Tags from '../containers/Tags'
// import Article from '../containers/Article'

export default {
  '/': {
    component: {
      template: ''
    }
  },
  '/articles/page/:page': {
    // component: Articles
    component: function (resolve) {
      require(['../containers/Articles'], resolve)
    }
  },
  '/categories': {
    // component: Categories
    component: function (resolve) {
      require(['../containers/Categories'], resolve)
    }
  },
  '/achieves': {
    // component: Achieves
    component: function (resolve) {
      require(['../containers/Achieves'], resolve)
    }
  },
  '/tags': {
    // component: Tags
    component: function (resolve) {
      require(['../containers/Tags'], resolve)
    }
  },
  '/articles/:key': {
    // component: Article
    component: function (resolve) {
      require(['../containers/Article'], resolve)
    }
  },
  '/categories/:key': {
    // component: Category
    component: function (resolve) {
      require(['../containers/Category'], resolve)
    }
  }
}
export const redirect = {
  '*': '/',
  '/articles': '/articles/page/1'
}
