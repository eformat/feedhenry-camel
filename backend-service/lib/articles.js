var articles = [
    {id:1, title:'My cool article 1', description:'This is a blog article ...', date:'11-11-2015'},
    {id:2, title:'My cool article 2', description:'This is a blog article ...', date:'12-11-2015'},
    {id:3, title:'My cool article 3', description:'This is a blog article ...', date:'13-11-2015'},
    {id:4, title:'My cool article 4', description:'This is a blog article ...', date:'14-11-2015'},
    {id:5, title:'My cool article 5', description:'This is a blog article ...', date:'15-11-2015'},
    {id:6, title:'My cool article 6', description:'This is a blog article ...', date:'16-11-2015'}
];

var request = require('request')
//require('request-debug')(request);

exports.findAll = function (req, res, next) {
    console.log("Service Find All called");
    request('http://localhost:9200/blog/_search?pretty=true&q=*:*&size=50', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            var result = [];
            var hits = jsonData.hits.hits;
            for (var i = 0; i < hits.length; i++) {
                result.push(hits[i]._source);
            }
            res.send(JSON.stringify(result));
        }
    })
};

exports.findById = function (req, res, next) {
    console.log("Service FindById called");    
    var id = req.params.id;
    request('http://localhost:9191/blog/article/search/id/' + id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        }
    })
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
    console.log("Service New Post called");
    var article = req.body;
    var articleCleaned = '{"id":"' + article.id + '","user":"' + article.user + '","title":"' + article.title + '","body":"' + article.description + '","postDate":"' + article.date + '"}';
    console.log(articleCleaned);
    request({method: "PUT",
             uri: 'http://localhost:9191/blog/article',
             json: true,
             body: articleCleaned}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Response received : " + body);
            res.send(body);
        } else {
            console.log("Error returned : " + error + ", " + body);
        }
    })
};
