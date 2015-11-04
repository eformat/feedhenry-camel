var articles = [
    {id:1, title:'My cool article 1', description:'This is a blog article ...', date:'11-11-2015'},
    {id:2, title:'My cool article 2', description:'This is a blog article ...', date:'12-11-2015'},
    {id:3, title:'My cool article 3', description:'This is a blog article ...', date:'13-11-2015'},
    {id:4, title:'My cool article 4', description:'This is a blog article ...', date:'14-11-2015'},
    {id:5, title:'My cool article 5', description:'This is a blog article ...', date:'15-11-2015'},
    {id:6, title:'My cool article 6', description:'This is a blog article ...', date:'16-11-2015'}
];

var request = require('request')

exports.findAll = function (req, res, next) {
    console.log("Service Find All called");
    res.send(articles);
};

exports.findById = function (req, res, next) {
    console.log("Service FindById called");    
    var id = req.params.id;
    res.send(articles[id]);
};

exports.findByUser = function(req, res, next) {
    console.log("Service FindByUser called");
    var user = req.params.user;
    request('http://localhost:9191/blog/article/search/user/' + user, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        }
    })
}

exports.newPost = function (req, res) {
    var article = req.body;
    articles.push(article);
    console.log(articles);
};
