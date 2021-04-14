/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list:async function(req,res){
    Articles.find({}).exec((err,articles) => {
      if(err){
        res.status(500).send({error : 'Database Error'});
      }
      console.log(articles);
      return res.view('list',{articles:articles});
    });
  },
  add : function (req,res){
    res.view('add',{a : 'add'});
  },
  create : function(req,res){
    var title = req.body.title;
    var body = req.body.body;

    Articles.create({title:title, body:body}).exec((err) => {
      if(err){
        res.send(500, {error: 'Database Error'});
      }

      res.redirect('/articles/list');
    });
  },
  delete: function(req, res){
    console.log(req.params.id);
    Articles.destroy({id:req.params.id}).exec((err) => {
      if(err){
        res.send(500, {error: 'Database Error'});
      }

      res.redirect('/articles/list');
    });

    return false;
  },
  edit: function(req, res){
    Articles.findOne({id:req.params.id}).exec((err, article) => {
      if(err){
        res.send(500, {error: 'Database Error'});
      }

      res.view('edit', {article:article});
    });
  },
  update: function(req, res){
    var title = req.body.title;
    var body = req.body.body;

    Articles.update({id: req.params.id},{title:title, body:body}).exec((err) => {
      if(err){
        res.send(500, {error: 'Database Error'});
      }

      res.redirect('/articles/list');
    });

    return false;
  }
};

// <% articles.forEach(function(article){ %>
//   <tr>
//       <td><%= article.body %></td>
//       <td><%= article.title %></td>
//       <!-- <td>
//           <a href="/articles/edit/<%= article.id %>" class="btn btn-primary">Edit</a>
//           <form class="d-inline" action="/articles/delete/<%= article.id %>" method="post">
//               <input type="submit" value="Delete" class="btn btn-danger">
//           </form>
//       </td> -->
//   </tr>
// <% }) %>

