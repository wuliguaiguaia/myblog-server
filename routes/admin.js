
const express = require("express");
const router = express.Router();
const User = require('./../database/schema/user');
const Category = require('./../database/schema/category');
const Article = require('./../database/schema/article');

/* 用户列表 */ 
router.post("/user/list", async function(req, res, next) {
  const {page, num} = req.body;
  if(!page || !num) {
    res.json({
      errNo: 2001,
      message: '没有相关参数',
      data: null
    })
    return
  }
  await User.count().then(total =>{
    if (total === 0) {
      res.json({
        errNo: 0,
        message: '',
        data: { total: 0, data: {
          total: 0,
          list:[]
        }}
      })
      return
    }

    const limit = 6;
    const skip = limit * (page - 1);
    User.find().sort({createtime: 1}).limit(limit).skip(skip).then(users => {
      let list = users.map(user => {
        return {
          id : user._id,
          username: user.username,
          password: user.password,
          createtime: user.createtime,
          isadmin: user.isadmin || false
        }
      })
      res.json({
        errNo: 0,
        message:'',
        data: { total, list}
      })
      return
    })
  });
});

/* 修改用户 */ 
router.post("/user/edit", async function(req, res, next) {
  const { id, username, password } = req.body;
  if (!id) {
    res.json({
      errNo: 2001,
      message: '没有相关参数',
      data: null
    })
    return
  }
  try{
    await User.findById(id).then(user => {
      User.update({_id: id},{username,password,updatetime: Date.now()})
      res.json({
        errNo: 0,
        message: '',
        data: null
      })
      return
    })
  } catch {
    res.json({
      errNo: 2002,
      message: '未查询到该用户',
      data: null
    })
    return
  }
})

/* 删除用户 */ 
router.post("/user/delete", async function (req, res, next) {
  const { id } = req.body;
  if (!id) {
    res.json({
      errNo: 2001,
      message: '没有相关参数',
      data: null
    })
    return
  }
  try {
    await User.remove({ _id: id });
    res.json({
      errNo: 0,
      message: '',
      data: null
    })
    return
  } catch {
    res.json({
      errNo: 2003,
      message: '未查询到该用户',
      data: null
    })
    return
  }
})

/* 添加分类 */ 
router.post("/category/add", async (req,res,next) => {
  const {name} = req.body;
  if(!name){
    res.json({
      errNo: 2001,
      message: '没有相关参数',
      data: null
    })
    return
  }

  try{
    await Category.findOne({name}).then(cate => {
      if (!cate){
        let category = new Category({name, createtime: Date.now()});
        category.save();
        res.json({
          errNo: 0,
          message: '',
          data: null
        })
        return
      }else{
        res.json({
          errNo: 2004,
          message: '该分类已存在',
          data: null
        })
        return
      }
    });
  } catch{
    res.json({
      errNo: 2005,
      message: '分类添加失败',
      data: null
    })
    return
  }
})

/* 修改分类 */ 
router.post("/category/edit", async (req, res, next) => {
  const { id,name } = req.body;
  if (!id || !name) {
    res.json({
      errNo: 2001,
      message: '没有相关参数',
      data: null
    })
    return
  }

  try {
    await Category.findOne({ _id:id }).then(async cate => {
      if (!cate) {
        res.json({
          errNo: 2005,
          message: '未找到相关分类',
          data: null
        })
        return
      } else {
        await Category.update({_id:id},{name,updatetime: Date.now()})
        res.json({
          errNo: 0,
          message: '',
          data: null
        })
        return
      }
    });
  } catch{
    res.json({
      errNo: 2005,
      message: '分类修改失败',
      data: null
    })
    return
  }
})

/* 删除分类 */ 
router.post("/category/delete", async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    res.json({
      errNo: 2001,
      message: '没有相关参数',
      data: null
    })
    return;
  }

  try {
    await Category.findOne({ _id: id }).then(async cate => {
      if (!cate) {
        res.json({
          errNo: 2005,
          message: '未找到相关分类',
          data: null
        })
        return
      } else {
        await Category.remove({ _id: id });
        res.json({
          errNo: 0,
          message: '',
          data: null
        })
        return
      }
    });
  } catch{
    res.json({
      errNo: 2005,
      message: '分类删除失败',
      data: null
    })
    return
  }
})

/* 获取分类列表 */ 
router.get("/category/list", async (req, res, next) => {
  try {
    await Category.find().then(async list => {
      list = list.map(item => {
        return {
          name: item.name,
          id: item.id.slice(-2)
        }
      })
      res.json({
        errNo: 0,
        message: '',
        data: list
      })
    })
  } catch{
    res.json({
      errNo: 2005,
      message: '分类获取失败',
      data: null
    })
  }
  return
})

/* 添加文章 */ 
router.post("/article/add", async (req, res, next) => {
  const { title, description = '', content, pic = '', category = [] } = req.body; //todo
  if (!title || !content || !category.length) {
    res.json({
      errNo: 2001,
      message: '没有相关参数',
      data: null
    });
    return;
  }
  try {
    await Article.findOne({ title }).catch(_ => {
      res.json({
        errNo: 2005,
        message: '文章添加失败',
        data: null
      })
      return;
    }).then(cate => {
      if (!cate) {
        let article = new Article({ title, description, category, content, pic, createtime: Date.now() });
        article.save();
        res.json({
          errNo: 0,
          message: '',
          data: null
        })
      } else {
        res.json({
          errNo: 2004,
          message: '该文章标题已存在',
          data: null
        })
        return
      }
    }).catch(_ => {
      res.json({
        errNo: 2005,
        message: '文章添加失败',
        data: null
      })
    })
  } catch{
    res.json({
      errNo: 2005,
      message: '文章添加失败',
      data: null
    })
  }
})

/* 修改文章 */ 
router.post("/article/edit", async (req, res, next) => {
  const {id, title, description, content, pic, category } = req.body;
  if (!id || !title) {
    res.json({
      errNo: 2001,
      message: '没有相关参数',
      data: null
    })
    return 
  }
  try {
    await Article.findOne({ _id: id }).then(async cate => {
      if (!cate) {
        res.json({
          errNo: 2005,
          message: '未找到相关文章',
          data: null
        })
      } else {
        await Article.update({ _id: id }, { title, title, description, content, pic, category, updatetime: Date.now() })
        res.json({
          errNo: 0,
          message: '',
          data: null
        })
      }
    });
  } catch{
    res.json({
      errNo: 2005,
      message: '文章修改失败',
      data: null
    })
  }
})

/* 删除文章 */ 
router.post("/article/delete", async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    res.json({
      errNo: 2001,
      message: '没有相关参数',
      data: null
    })
  }

  try {
    await Article.findOne({ _id: id }).then(async cate => {
      if (!cate) {
        res.json({
          errNo: 2005,
          message: '未找到相关文章',
          data: null
        })
      } else {
        await Article.remove({ _id: id });
        res.json({
          errNo: 0,
          message: '',
          data: null
        })
      }
    });
  } catch{
    res.json({
      errNo: 2005,
      message: '文章删除失败',
      data: null
    })
  }
})

/* 获取文章列表 */
router.post("/article/getlist", async (req, res, next) => {
  // const { id } = req.body;
  // if (!id) {
  //   res.json({
  //     errNo: 2001,
  //     message: '没有相关参数',
  //     data: null
  //   })
  // }

  try {
    await Article.find().then(async cate => {
      if (!cate&&cate.length <= 0) {
        res.json({
          errNo: 2005,
          message: '未找到相关文章',
          data: null
        })
      } else {
        const list = cate.map(item => {
          const { title, description, tags = [], category, pic, createtime } = item
          return {
            item: item._id,
            title,
            description,
            tags,
            category, pic,
            createtime
          }
        })
        res.json({
          errNo:110,
          message: '',
          data:{list}
        })
      }
    });
  } catch{
    res.json({
      errNo: 2005,
      message: '文章获取失败',
      data: null
    })
  }
})

module.exports = router;
