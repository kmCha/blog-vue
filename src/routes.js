import Articles from './containers/Articles'
import Categories from './containers/Categories'
import Category from './containers/Category'
import Achieves from './containers/Achieves'
import Tags from './containers/Tags'
import Article from './containers/Article'

export default {
  '/': {
    component: {
      template: ''
    }
  },
  '/articles': {
    component: Articles
  },
  '/categories': {
    component: Categories
  },
  '/achieves': {
    component: Achieves
  },
  '/tags': {
    component: Tags
  },
  '/articles/:key': {
    component: Article
  },
  '/categories/:key': {
    component: Category
  }
}
export const redirect = {
  '*': '/articles'
}
