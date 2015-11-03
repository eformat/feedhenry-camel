'use strict';

var blog = angular.module('blog.controllers', ['blog.services']);

blog.controller('MainCtrl', function ($scope, fhcloud) {

    $scope.version = "1.0";

    // add function to pass userInput to cloud via
    // $fh.cloud call to controller scope
    $scope.sayHello = function () {
        var article = $scope.article;

        //Notifying the user that the cloud endpoint is being called.
        $scope.noticeMessage = "Calling Cloud Endpoint";
        $scope.textClassName = "ion-loading-c";

        console.log("Article id : " + article.id);

        // check if userInput is defined
        if (article.id) {
            /**
             * Pass the userInput to the service containing the $fh.cloud call.
             *
             * Notice that the defer.resolve and defer.reject functions are passed to the module.
             * One of these functions will be called when the $fh.cloud function has completed successully or encountered
             * an error.
             */
            fhcloud('hello', {hello: article.title})
                .then(function (response) {
                    // If successful, display the length  of the string.
                    if (response.msg != null && typeof(response.msg) !== 'undefined') {
                        var resp = response.msg;
                        $scope.noticeMessage = resp.msg + ", Date : " + timeConverter(resp.timestamp);
                        $scope.textClassName = "ion-checkmark-round";
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
        }
    };

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

blog.controller('ArticlesCtrl', function ($scope, fhcloud, $ionicModal, articleService) {
    $scope.articles = articleService.query();

    // add function to pass userInput to cloud via
    // $fh.cloud call to controller scope
    $scope.sayHello = function(article) {
        
        // check if article is defined
        if (article.id) {

            $scope.articles.push({id: article.id, title: article.title, description: article.description, date: article.date});
            /**
             * Pass the userInput to the service containing the $fh.cloud call.
             *
             * Notice that the defer.resolve and defer.reject functions are passed to the module.
             * One of these functions will be called when the $fh.cloud function has completed successully or encountered
             * an error.
             */
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

    $scope.addArticle = function (a) {
        $scope.articles.push({id: a.id, title: a.title, description: a.description, date: a.date});
        articleService.save(a);
        $scope.modal.hide();
    };

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

blog.controller('ArticleCtrl', function ($scope, articleService, $stateParams) {
    $scope.article = articleService.get({articleId: $stateParams.articleId});
});