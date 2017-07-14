var mongoose = require('mongoose')
var Category = mongoose.model('Category')

// admin new page
exports.new = function(req, res) {
  res.render('category/admin', {
    title: 'imooc 后台分类录入页',
    category: {}
  })
}

// detail page
exports.detail = function(req, res) {
  console.log('-------- now in category.detail')
  var id = req.params.id

  Category.findById(id, function(err, category) {
    res.render('category/detail', {
          title: 'imooc 分类详情页',
          category: category
        })
  })
}

// admin update page
exports.update = function(req, res) {
  var id = req.params.id

  if (id) {
    Category.findById(id, function(err, category) {
      res.render('category/admin', {
        title: 'imooc 后台分类更新页',
        category: category
      })
    })
  }
}

// admin post movie
exports.save = function(req, res) {
  var _category = req.body.category
  var category = new Category(_category)

  category.save(function(err, category) {
    if (err) {
      console.log(err)
    }

    res.redirect('/admin/category/list')
  })
}


// category list page
exports.list = function(req, res) {
  console.log('-------- now in category.list')
  Category.fetch(function(err, catetories) {
    if (err) {
      console.log(err)
    }

    res.render('category/list', {
      title: 'imooc 分类列表页',
      catetories: catetories
    })
  })
}

exports.del = function(req, res) {
  console.log('-----------now in category.del')
  var id = req.query.id

  console.log('category id:' + id)
  if (id) {
    Category.remove({_id: id}, function(err, movie) {
      if (err) {
        console.log(err)
        res.json({success: 0})
      }
      else {
        res.json({success: 1})
      }
    })
  }
}