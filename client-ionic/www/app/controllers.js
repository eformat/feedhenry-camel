'use strict';

var blog = angular.module('blog.controllers', ['blog.services']);

blog.controller('ArticlesCtrl', function ($scope, fhcloud, $ionicModal, articleService) {
    /*$scope.articles = articleService.query();*/

    $scope.addArticle = function (article) {

        // check if article is defined
        if (article.id) {

            $scope.articles.push({
                id: article.id,
                title: article.title,
                description: article.description,
                date: article.date
            });

            fhcloud('articles', article, 'POST')
                .then(function (response) {
                    if (response.msg != null && typeof(response.msg) !== 'undefined') {
                        var resp = response.msg;
                        $scope.noticeMessage = resp.msg;
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
});

blog.controller('SearchByUserCtrl', function ($scope, fhcloud, articleService) {

    $scope.articles = articleService.articleList;
    $scope.searchByUser = function (user) {
        fhcloud('articles/searchuser/' + user.name, null, 'GET')
            .then(function (response) {
                articleService.replaceArticles(response);
                $scope.articles = response;
            })
            .catch(function (msg, err) {
                //If the cloud call fails
                $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
                $scope.textClassName = "ion-close-round";
            });
    };
    /*$scope.showDetail = function($stateParams) {
        $scope.article = $scope.articles.entries[$stateParams.articleId];
    }*/
});

blog.controller('ArticleCtrl', function ($scope, $stateParams) {
    /*
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
        */
    $scope.article = $scope.articles.entries[$stateParams.articleId];

});