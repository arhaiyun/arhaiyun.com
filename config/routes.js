/**
 * url mapping request
 * author: arhaiyun
 * time: 2017.07.10
 */

// include controllers
var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment = require('../app/controllers/comment')
var Category = require('../app/controllers/category')

var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()


module.exports = function(app) {

  // pre handle user
  app.use(function(req, res, next) {
    var _user = req.session.user

    app.locals.user = _user

    next()
  })

  // Index
  app.get('/', Index.index)

  // User
  app.get('/signin', User.showSignin)
  app.get('/signup', User.showSignup)
  app.get('/logout', User.logout)
  app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)
  app.post('/user/signup', User.signup)
  app.post('/user/signin', User.signin)

  // Movie
  app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
  app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
  app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
  app.get('/admin/movie/:id', Movie.detail)
  app.post('/admin/movie', User.signinRequired, multipartMiddleware, User.adminRequired, Movie.savePoster, Movie.save)
  app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)

  // Comment
  app.post('/user/comment', User.signinRequired, Comment.save)

  // Category
  app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)
  app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
  app.get('/admin/category/update/:id', User.signinRequired, User.adminRequired, Category.update)
  app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
  app.delete('/admin/category/list', User.signinRequired, User.adminRequired, Category.del)
  app.get('/admin/category/:id', Category.detail)

  // search results
  app.get('/results', Index.search)
}