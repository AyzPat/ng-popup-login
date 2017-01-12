'use strict';


var app = angular

    .module("myApp", ['ui.router', 'ngMaterial',
        'ngAnimate', 'myApp.login', 'myApp.home',
        'ngMdIcons',])
       

    .config(function ($stateProvider, $locationProvider,
        $urlRouterProvider,$httpProvider) {
$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


        $stateProvider

            .state("/", {
                url: "/login",
                templateUrl: "login/login.html",
                controller: "LoginCtrl",
            })

            .state("home", {
                url: "/",
                templateUrl: "home/home.html",
                controller: "homeController",
            })

            .state('home.view', {
                url: "view",
                templateUrl: 'html/view.html',

            })
            .state('home.clergy', {
                url: "clergy",
                templateUrl: 'html/clergy.html',
            })
            .state('home.profile', {
                url: "profile",
                templateUrl: 'html/profile.html',
                controller: 'profileController'
            })

            .state('home.profile.about', {
                url: "/about",
                templateUrl: 'html/profile/about.html',

            })

            .state('home.profile.contact', {
                url: "/contact",
                templateUrl: 'html/profile/contact.html',

            })

        $urlRouterProvider.otherwise('/');

        //  $locationProvider.html5Mode(true);
    })

/* Controllers */

    .controller("profileController", function ($scope, $state) {
        var str = $state.current.url;
        var res = str.split("/");

        $scope.currentNavItem = res[1];

    })
