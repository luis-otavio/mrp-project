// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
  })
  

  .state('app.cadastrarCliente', {
    url: '/cadastrarCliente',
    views: {
      'menuContent': {
        templateUrl: 'templates/cadastrarCliente.html'
      }
    }
  })

  .state('app.consultarProducao', {
    url: '/consultarProducao',
    views: {
      'menuContent': {
        templateUrl: 'templates/consultarProducao.html'
      }
    }
  })

  .state('app.cadastrarProduto', {
    url: '/cadastrarProduto',
    views: {
      'menuContent': {
        templateUrl: 'templates/cadastrarProduto.html'
      }
    }
  })

  .state('app.cadastroPedido', {
      url: '/cadastroPedido',
      views: {
        'menuContent': {
          templateUrl: 'templates/cadastroPedido.html'
        }
      }
  })

  .state('app.clientesCadastrados', {
      url: '/clientesCadastrados',
      views: {
        'menuContent': {
          templateUrl: 'templates/clientesCadastrados.html'
        }
      }
  })

  .state('app.consultarEstoque', {
      url: '/consultarEstoque',
      views: {
        'menuContent': {
          templateUrl: 'templates/consultarEstoque.html'
        }
      }
  })

  .state('app.consultarPedidos', {
      url: '/consultarPedidos',
      views: {
        'menuContent': {
          templateUrl: 'templates/consultarPedidos.html'
        }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});