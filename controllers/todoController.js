var bodyParser = require('body-parser');
var mongosses = require('mongoose');

//connect to database
mongosses.connect('mongodb+srv://EbrahimDeen:test@todolist1-nrsvf.mongodb.net/test');


//create a schema this is like a blue print

var todoSchema= new mongosses.Schema({
    item: String
});

//module
var Todo =mongosses.model('Todo',todoSchema);
// var itemOne=Todo({item:'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// });

//var data =[{item: 'get milk'},{item: 'walk dog'},{item: 'complete your tasks'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = function(app){
    
    app.get('/todo',function(req,res){
        //get data from mongodb and pass it to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos: data});
        });
        

    });
    
    app.post('/todo', urlencodedParser, function(req,res){
        //get data from the view and added it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    //    data.push();
    //    res.json(data);
    });


    app.delete('/todo/:item',function(req,res){
        //delete a item from DB
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
        // data =data.filter(function(todo){
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        
        // });
        // res.json(data);
    });
};