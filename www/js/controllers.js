angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, HttpService) {
  
  //Codigo relacionado ao login e seu MODAL
    //-------------------------------------------------------------------------------------------------------------
  

  $ionicModal.fromTemplateUrl('my-modal.html', {
   scope: $scope,
   animation: 'slide-in-up'
 }).then(function(modal) {
   $scope.modal = modal;
 });

$scope.openModalEstoque = function(produto) {
    $scope.modal.show();
    $scope.produto = produto; // permite que o conteúdo vá para Modal
};

$scope.openModalCliente = function(cliente) {
    $scope.modal.show();
    $scope.cliente = cliente; // permite que o conteúdo vá para Modal
};

$scope.openModalPedido = function(pedido) {
    $scope.modal.show();
    $scope.pedido = pedido; // permite que o conteúdo vá para Modal
};

$scope.closeModal = function() {
    $scope.modal.hide();    
};
    //-------------------------------------------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// CONECCAO COM MODEL ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DA PRODUCAO ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 $scope.consultaProducao = function(){
    HttpService.consultaProducao($scope.producao)
   .then(function(response) {
       $scope.producoes = response;       
    });
 }

 $scope.consultaGastos = function(){
    HttpService.consultaGastos($scope.pedido)
   .then(function(response) {
       $scope.pedidos = response;       
    });
 }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DO ESTOQUE ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 $scope.consultaEstoque = function(){
    HttpService.getEstoque()
   .then(function(response) {
       $scope.produtos = response;
       
    });
 }
      

$scope.insereEstoque = function(){
    HttpService.insereEstoque($scope.produto)
   .then(function(response) {
       $scope.produtos = response;
       alert("Inserção com sucesso");
       
    });
 }

$scope.deleteEstoque = function(produto){
  var resposta = confirm("Confirma a exclusão deste elemento?");
  if (resposta == true){
        HttpService.removeEstoque(produto)
        .then(function (response){
                  alert("Remoção com sucesso");
                });
  }
}


$scope.atualizaEstoque = function(){
    HttpService.atualizaEstoque($scope.produto)
   .then(function(response) {
       $scope.produtos = response;
       alert("Atualização com sucesso");
       
    });
 }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DO CLIENTE ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 $scope.consultaCliente = function(){
    HttpService.getCliente()
   .then(function(response) {
       $scope.clientes = response;
       
    });
 }
      

$scope.insereCliente = function(){
    HttpService.insereCliente($scope.cliente)
   .then(function(response) {
       $scope.clientes = response;
       alert("Inserção com sucesso");
       
    });
 }

$scope.deleteCliente = function(item){
  var resposta = confirm("Confirma a exclusão deste elemento?");
  if (resposta == true){
        HttpService.removeCliente(item)
        .then(function (response){
                  alert("Remoção com sucesso");
                });
  }
}

$scope.atualizaCliente= function(){
    HttpService.atualizaCliente($scope.cliente)
   .then(function(response) {
       $scope.clientes = response;
       alert("Atualização com sucesso");
       
    });
 }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DO PEDIDO ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 $scope.consultaPedido = function(){
    HttpService.getPedido()
   .then(function(response) {
       $scope.pedidos = response;
       
    });
 }
      

$scope.inserePedido = function(){
    HttpService.inserePedido($scope.pedido)
   .then(function(response) {
       $scope.pedidos = response;
       alert("Inserção com sucesso");
       
    });
 }

$scope.deletePedido = function(item){
  var resposta = confirm("Confirma a exclusão deste elemento?");
  if (resposta == true){
        HttpService.removePedido(item)
        .then(function (response){
                  alert("Remoção com sucesso");
                });
  }
}

$scope.atualizaPedido= function(){
    HttpService.atualizaPedido($scope.pedido)
   .then(function(response) {
       $scope.pedidos = response;
       alert("Atualização com sucesso");
       
    });
 }
})

.service('HttpService', function($http) {
 return {
  
   consultaProducao: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.post('http://localhost:3000/consultaProducao', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Pedido em producao', response);
         return response.data;
      });
   },

   consultaGastos: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.post('http://localhost:3000/consultaGastos', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Gastos', response);
         return response.data;
      });
   },

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DO ESTOQUE ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   getEstoque: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.get('http://localhost:3000/consultaEstoque')
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get Estoque', response);
         return response.data;
      });
   },

   insereEstoque: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.post('http://localhost:3000/insereEstoque', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Novo Produto no Estoque', response);
         return response.data;
      });
   },



  removeEstoque: function(produto){
     return $http.delete('http://localhost:3000/removeEstoque/' + produto.id_produto)
      .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Produto removido do Estoque', response);
         return response.data;
      }
      )
  },



   atualizaEstoque: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
      $http.put('http://localhost:3000/atualizaEstoque', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Produto Atualizado no Estoque', response);
         return response.data;
      });
   },



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DO CLIENTE ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   getCliente: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.get('http://localhost:3000/consultaCliente')
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get Cliente', response);
         return response.data;
      });
   },

   insereCliente: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.post('http://localhost:3000/insereCliente', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Novo Cliente', response);
         return response.data;
      });
   },

    removeCliente: function(prod){
     return $http.delete('http://localhost:3000/removeCliente/' + prod.id_cliente)
      .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Cliente removido', response);
         return response.data;
      }
      )
  },

   atualizaCliente: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
      $http.put('http://localhost:3000/atualizaCliente', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Cliente Atualizado', response);
         return response.data;
      });
   },


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DO PEDIDO ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   getPedido: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.get('http://localhost:3000/consultaPedido')
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get Pedido', response);
         return response.data;
      });
   },

   inserePedido: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.post('http://localhost:3000/inserePedido', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Novo Pedido na Lista', response);
         return response.data;
      });
   },

  removePedido: function(prod){
     return $http.delete('http://localhost:3000/removePedido/' + prod.id_pedido)
      .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Pedido removido da Lista', response);
         return response.data;
      }
      )
  },

   atualizaPedido: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
      $http.put('http://localhost:3000/atualizaPedido', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Pedido Atualizado na Lista', response);
         return response.data;
      });
   }

 };
});




