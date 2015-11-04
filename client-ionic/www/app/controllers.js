'use strict';

var blog = angular.module('blog.controllers', ['blog.services']);

blog.controller('ArticlesCtrl', function ($scope, fhcloud, $ionicModal, articleService) {

    $scope.addArticle = function (article) {

        // check if article is defined
        if (article.id) {

            /*
            $scope.articles.push({
                id: article.id,
                title: article.title,
                description: article.description,
                date: article.date
            });
            */

            articleService.addArticle(article);

            fhcloud('articles', article, 'POST')
                .then(function (response) {
                    console.log("Message encoded");
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

blog.controller('FindAllCtrl', function ($scope, fhcloud, articleService) {
    fhcloud('articles/', null, 'GET')
        .then(function (response) {
            articleService.replaceArticles(response);
            $scope.articles = response;
        })
        .catch(function (msg, err) {
            //If the cloud call fails
            $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
            $scope.textClassName = "ion-close-round";
        });
});

blog.controller('SearchByUserCtrl', function ($scope, fhcloud, articleService) {
    $scope.articles = {};
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
});

blog.controller('SearchByIdCtrl', function ($scope, fhcloud, articleService) {
    $scope.articles = {};
    $scope.searchById = function (articleid) {
        fhcloud('articles/searchid/' + articleid, null, 'GET')
            .then(function (response) {
                articleService.cleanArticles();
                articleService.addArticle(response);
                $scope.articles = articleService.getArticles();
            })
            .catch(function (msg, err) {
                //If the cloud call fails
                $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
                $scope.textClassName = "ion-close-round";
            });
    };
});

blog.controller('ArticleCtrl', function ($scope, $stateParams, articleService) {
    console.log("ID : " + $stateParams.articleId);
    $scope.article = articleService.getArticleById([$stateParams.articleId]);
});