// import Articles from '../containers/Articles'
// import Categories from '../containers/Categories'
// import Category from '../containers/Category'
// import Achieves from '../containers/Achieves'
// import Tags from '../containers/Tags'
// import Article from '../containers/Article'

export default [
  {
    path: '/',
    component: {
      template: '<div></div>'
    }
  },
  {
    path: '/articles/page/:page',
    component: function (resolve) {
      require(['../containers/Articles'], resolve)
    }
  },
  {
    path: '/categories',
    // component: Categories
    component: function (resolve) {
      require(['../containers/Categories'], resolve)
    }
  },
  {
    path: '/achieves',
    // component: Achieves
    component: function (resolve) {
      require(['../containers/Achieves'], resolve)
    }
  },
  {
    path: '/tags',
    // component: Tags
    component: function (resolve) {
      require(['../containers/Tags'], resolve)
    }
  },
  {
    path: '/articles/:key',
    // component: Article
    component: function (resolve) {
      require(['../containers/Article'], resolve)
    }
  },
  {
    path: '/categories/:key',
    // component: Category
    component: function (resolve) {
      require(['../containers/Category'], resolve)
    }
  },
  {
    path: '/articles',
    redirect: '/articles/page/1'
  },
  {
    path: '*',
    redirect: '/'
  }
]
