import Articles from './containers/Articles'
import Categories from './containers/Categories'
import Category from './components/Category'
import Achieves from './containers/Achieves'
import Tags from './containers/Tags'
import Article from './components/Article'

export default {
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
