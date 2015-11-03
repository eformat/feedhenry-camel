'use strict';

var blog = angular.module('blog.controllers', ['blog.services']);

blog.controller('ArticlesCtrl', function ($scope, fhcloud, $ionicModal, articleService) {
    $scope.articles = articleService.query();

    $scope.addArticle = function(article) {
        
        // check if article is defined
        if (article.id) {

            $scope.articles.push({id: article.id, title: article.title, description: article.description, date: article.date});

            fhcloud('articles', article, 'POST')
                .then(function (response) {
                    // If successful, display the length  of the string.
                    if (response.msg != null && typeof(response.msg) !== 'undefined') {
                        var resp = response.msg;
                        $scope.noticeMessage = resp.msg + ", Date : " + timeConverter(resp.timestamp);
                        $scope.textClassName = "ion-checkmark-round";
                        console.log("Response : " + resp.msg + ", Date : " + timeConverter(resp.timestamp));
                    } else {
                        $scope.noticeMessage = "Error: Expected a message from $fh.cloud.";
                        $scope.textClassName = "ion-close-round";
                    }
                })
                .catch(function (msg, err) {
                    //If the cloud call fails
                    $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
                    $scope.textClassName = "ion-close-round";
                });

            $scope.modal.hide();
        }
    };

    // Create our modal
    $ionicModal.fromTemplateUrl('views/new-article.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    function timeConverter(timestamp) {
        var a = new Date(timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    };

})

blog.controller('ArticleCtrl', function ($scope, articleService, fhcloud, $stateParams) {
    fhcloud('articles/' + $stateParams.articleId, null, 'GET')
        .then(function (response) {
            $scope.article = response;
        })
        .catch(function (msg, err) {
            //If the cloud call fails
            $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
            $scope.textClassName = "ion-close-round";
            console.log("Get an error !");
        });
    
});