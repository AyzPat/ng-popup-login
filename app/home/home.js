'use strict';

angular.module('myApp.home', ['ui.router'])

    .run(function ($rootScope, $anchorScroll) {
        $rootScope.$on("$locationChangeSuccess", function () {
            $anchorScroll();
        });


    })

    .controller("homeController", ['$scope', 'CommonProp', '$state', '$mdSidenav',
         function ($scope, CommonProp, $state,
            $mdSidenav) {



            $scope.username = CommonProp.getUser();
            $scope.sidenav = CommonProp.getnav();
            $scope.data = {};
            $scope.data.cb1 = "";
            $scope.value = "";

            if (!$scope.username) {
                alert("please Login")
                $state.go('/');


            }


            if ($scope.sidenav) {
                $scope.data.cb1 = true;
                toggleOn('left');
            }
            else
                $scope.data.cb1 = false;


            $scope.logout = function () {
                CommonProp.logoutUser();
            }

            $scope.toggler = function () {

                if (!$scope.data.cb1) {
                    localStorage.setItem('sidenav', true);
                    toggleOn('left');

                }


                else {


                    localStorage.removeItem("sidenav");

                    toggleOff('left');


                }

            }





            function toggleOn(id) {


                $scope.isSidenavOn = true;
                // $mdSidenav(id).open();
                document.getElementById("main").style.marginLeft = "20%";
                document.getElementById("mySidenav").style.width = "250px";



            }

            function toggleOff(id) {


                $scope.isSidenavOn = false;
                // $mdSidenav(id).close();
                document.getElementById("mySidenav").style.width = "0%";
                document.getElementById("main").style.marginLeft = "10%";

            }

            $scope.clickEvent = function () {

                if (!$scope.value) {
                    toggleOn('left');

                    $scope.value = true;
                }
                else {
                    toggleOff('left');
                    $scope.value = false;
                }

            }


        }
    ])
