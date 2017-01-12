'use strict';

angular.module('myApp.login', ['ui.router', 'firebase'])


    .controller('LoginCtrl', ['$scope', '$firebaseAuth', '$state','$http', 'CommonProp', function ($scope, $firebaseAuth, $state,$http, CommonProp) {

        $scope.id = CommonProp.getUser();
        if ($scope.id) {
            $state.go('home');
        }


        // $scope.googlesignIn = function () {
        //     var provider = new firebase.auth.GoogleAuthProvider();
        //     firebase.auth().signInWithPopup(provider).then(function (result) {



        //         firebase.auth().onAuthStateChanged(user => {
        //             if (user) {
        //                 var id_token = googleUser.getAuthResponse().id_token;
        //                 console.log(id_token);
        //                 $state.go('home');
        //                 console.log(user.email)
        //                 CommonProp.setUser(user.email);

        //             }
        //         });




        //     }).catch(function (error) {

        //         console.log(error)
        //     })

        // }

        $scope.onSignIn =

            function (googleUser) {
                console.log('Google Auth Response', googleUser);
                // We need to register an Observer on Firebase Auth to make sure auth is initialized.
                var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
                    // Check if we are already signed-in Firebase with the correct user.

                    // Sign in with credential from the Google user.
                    var provider = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithPopup(provider).then(function (result) {



                        firebase.auth().onAuthStateChanged(user => {
                            if (user) {
                                $scope.uid=user.uid;
                                
                                $state.go('home');
                               // console.log(user.email)
                                CommonProp.setUser(user.email);
                                      

                            }
                                console.log($scope.uid);
                            var uid=$scope.uid;
$http({
    method: 'POST',
    url: 'http://localhost:8081/demo',
    data: {'uid':uid},
    body:'application/x-www-form-urlencoded',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

                            //  $http.post('http://localhost:8081/demo',$scope.uid,{'Content-Type': 'application/x-www-form-urlencoded'})
        .success(function( data ) {

});

                        });


                  


                    })
       





                });
      
         
            }




    }])



    .service('CommonProp', ['$state', '$firebaseAuth', function ($state, $firebaseAuth) {
        var user = "";
        var sidenav = "";
        var auth = $firebaseAuth();
        return {
            getUser: function () {
                if (user == '') {
                    user = localStorage.getItem("userEmail");
                }
                return user;
            },
            setUser: function (value) {
                localStorage.setItem("userEmail", value)
                user = value;



            },
            logoutUser: function () {
                auth.$signOut().then(function () {
                    user = '';
                    localStorage.removeItem("userEmail");
                    $state.go('/')
                })
            },

            getnav: function () {
                sidenav = localStorage.getItem("sidenav")
                return sidenav;
            }

        };
    }]);