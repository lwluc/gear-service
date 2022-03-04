/**
 * This file contains mainModule with injecting dependencies, routing and configuration.
 *
 * @version 1.1
 * @author Dmitry
 * @since 22.01.2016
 */
angular.module("mainModule", ['gettext', 'ui.router', 'angularMoment', 'ngMaterial', 'md.data.table',
    'angular-loading-bar', 'templates', 'angular-cache', 'duScroll', 'ngFileUpload', 'vcRecaptcha',
    'ngFileSaver'])
    .value('duScrollDuration', 3000)
    .constant('_', window._)
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('cheque', {
                    abstract: true,
                    url: "/cheques",
                    views: {
                        "header": {
                            controller: function($rootScope, $scope, $state) {
                                    $scope.selectedTab = $state.current.data.selectedTab;

                                    $rootScope.$on('$stateChangeSuccess',
                                        function(event, toState, toParams, fromState, fromParams) {
                                            $scope.selectedTab = toState.data.selectedTab;
                                        });
                                },
                            template: '<header selected-tab="selectedTab"></header>'
                        },
                        "content": {
                            template: "<ui-view></ui-view>"
                        }
                    }
                })
                .state('cheque.filter', {
                    url: "^/filter",
                    template: "<filters-page></filters-page>",
                    data: {'selectedTab': 0}
                })
                .state('cheque.edit', {
                    url: "^/cheque/{chequeId:[0-9]{1,10}}",
                    controller: function($scope, $stateParams) {
                            $scope.chequeID = $stateParams.chequeId;
                        },
                    template: '<cheque-page cheque-id="chequeID"></cheque-page>',
                    data: {'selectedTab': 1}
                })
                .state('cheque.create', {
                    url: "^/cheque",
                    template: '<cheque-page></cheque-page>',
                    data: {'selectedTab': 1}
                })
                .state('cheque.profile', {
                    url: "^/profile",
                    template: '<profile-page></profile-page>',
                    data: {'selectedTab': 4, 'access':['ROLE_ADMIN']}
                })
                .state('cheque.login', {
                    url: "^/login",
                    template: '<login-page></login-page>',
                    data: {'selectedTab': 5}
                });

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

            $httpProvider.interceptors.push(
                function($q, $injector, $rootScope, _) {
                    return {
                        responseError: function (response) {

                            if(response.status === -1) {
                                var warning = $injector.get('warning');
                                warning.showServerConnectionLostException();
                                return $q.reject(response);
                            }

                            if(response.status === 403) {
                                var $http = $injector.get('$http');
                                var deferred = $q.defer();
                                $http.get('/api/test').then(deferred.resolve, deferred.reject);
                                return deferred.promise.then(function () {
                                    return $http(response.config);
                                });
                            }

                            if(response.status === 401 && !_.isEmpty($rootScope.user)) {
                                var warning = $injector.get('warning');
                                warning.showServerSessionExpired();
                                return $q.reject(response);
                            }

                            if(response.data.exception === "org.springframework.orm.ObjectOptimisticLockingFailureException") {
                                var warning = $injector.get('warning');
                                warning.showAlertOptimisticLockingException();
                                return $q.reject(response);
                            }

                            return $q.reject(response);
                        }
                    };
                }
            );
    })
    .config(function($mdThemingProvider){
            $mdThemingProvider
                .theme('default')
                .primaryPalette('grey', {'default':'900'})
                .accentPalette('blue-grey', {'default':'900'});

            $mdThemingProvider
                .theme('inner-block')
                .primaryPalette('grey', {'default':'50'});

            $mdThemingProvider
                .theme('header')
                .primaryPalette('grey', {'default':'50'})
                .accentPalette('blue-grey', {'default':'50'})
                .dark();
    })
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 100;
    })
    .config(function($mdDateLocaleProvider) {
            $mdDateLocaleProvider.months = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
            $mdDateLocaleProvider.shortMonths = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
            $mdDateLocaleProvider.days = 'Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday'.split('_');
            $mdDateLocaleProvider.shortDays = 'Mon_Tue_Wed_Thu_Fri_Sat_Sun'.split('_');
            // Change week display to start on Monday.
            $mdDateLocaleProvider.firstDayOfWeek = 1;

            $mdDateLocaleProvider.formatDate = function(date) {
                return date ? moment(date).format('DD.MM.YYYY') : '';
            };

            $mdDateLocaleProvider.parseDate = function(dateString) {
                var m = moment(dateString, 'DD.MM.YYYY', true);
                return m.isValid() ? m.toDate() : new Date(NaN);
            };
    })
    .run(function(gettextCatalog, amMoment, auth, security, autocomplete, $rootScope){
            auth.init();
            security.init();
            gettextCatalog.setCurrentLanguage('en');
            amMoment.changeLocale('en');
            $rootScope.tableFilter = {sort: '-id', size: 15, page: 1};
    });