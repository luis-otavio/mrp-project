
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var core_use = require('cors');
var pg = require('pg');

app.use(core_use());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
var config = {
  user: 'postgres', //env var: PGUSER 
  database: 'MRP', //env var: PGDATABASE 
  password: '12345678', //env var: PGPASSWORD 
  port: 5432, //env var: PGPORT 
  max: 100, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

var pool = new pg.Pool(config);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DA PRODUCAO ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/consultaProducao', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT fn_gera_producao(' + req.body.pedido01 + ', ' + req.body.pedido02 + ', ' + req.body.pedido03 + ')', function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

app.post('/consultaGastos', function (req, res) {
// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT fn_gera_gastos(' + req.body.vermelho + ', ' + req.body.preto + ', ' + req.body.branco + ')', function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DO ESTOQUE ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Consultar estoque
// rota com protocolo GET para seleção no banco de dados
app.get('/consultaEstoque', function (req, res) {
	
	// to run a query we can acquire a client from the pool, 
	// run a query on the client, and then return the client to the pool 
	pool.connect(function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('SELECT * from tb_estoque order by id_produto', function(err, result) {
		//call `done()` to release the client back to the pool 
		done();
	 
		if(err) {
		  return console.error('error running query', err);
		}
		res.setHeader('Access-Control-Allow-Origin','*');
		res.json(result.rows); // servidor retorna a consulta em formato json
			
		});
	});
});


// rota com protocolo POST para inserção no banco de dados
app.post('/insereEstoque', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('insert into tb_estoque values (' + req.body.id_produto + 
    ', \'' + req.body.descricaoproduto + '\', ' + req.body.quantidade + ')', function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

app.delete('/removeEstoque/:id_produto', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
var id_produto = req.params.id_produto
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('delete from tb_estoque where id_produto = ' + 
  id_produto ,function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});




// rota com protocolo PUT para atualização no banco de dados
app.put('/atualizaEstoque', function (req, res) {

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('update tb_estoque set descricaoproduto = \'' + 
    req.body.descricaoproduto + '\', quantidade = ' + req.body.quantidade + 
    ' where id_produto = '+
    req.body.id_produto , function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DO CLIENTE ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/consultaCliente', function (req, res) {
  
  // to run a query we can acquire a client from the pool, 
  // run a query on the client, and then return the client to the pool 
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * from tb_cliente order by id_cliente', function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
   
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
      
    });
  });
});

// rota com protocolo POST para inserção no banco de dados
app.post('/insereCliente', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('insert into tb_cliente (id_cliente, nomeCliente, CNPJ, telefone, endereco) values (' + req.body.id_cliente + 
    ', \'' + req.body.nomeCliente + '\', ' + req.body.CNPJ + ', ' + req.body.telefone + ', \'' + req.body.endereco + '\')', function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

// rota com protocolo DELETE para remoção no banco de dados
app.delete('/removeCliente/:id_cliente', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
var id_cliente = req.params.id_cliente
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('delete from tb_cliente where id_cliente = ' + 
  id_cliente, function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

// rota com protocolo PUT para atualização no banco de dados
app.put('/atualizaCliente', function (req, res) {

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('update tb_cliente set nomecliente = \'' + req.body.nomecliente + '\', cnpj = ' + req.body.cnpj + 
    ', telefone = ' + req.body.telefone + ', endereco = \'' + req.body.endereco + '\' where id_cliente = '+
    req.body.id_cliente , function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PARTE DO PEDIDO ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/consultaPedido', function (req, res) {
  
  // to run a query we can acquire a client from the pool, 
  // run a query on the client, and then return the client to the pool 
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * from tb_pedido order by id_pedido', function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
   
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
      
    });
  });
});

// rota com protocolo POST para inserção no banco de dados
app.post('/inserePedido', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('insert into tb_pedido (id_pedido, id_cliente, vermelho, preto, branco) values ('
    + req.body.id_pedido + ', ' + req.body.id_cliente + ', ' +  req.body.vermelho + ', ' +
      req.body.preto + ', ' +  req.body.branco + ')', function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});



// rota com protocolo DELETE para remoção no banco de dados
app.delete('/removePedido/:id_pedido', function (req, res) {

// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
var id_pedido = req.params.id_pedido
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('delete from tb_pedido where id_pedido = ' + 
	id_pedido, function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});

// rota com protocolo PUT para atualização no banco de dados
app.put('/atualizaPedido', function (req, res) {

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('update tb_pedido set id_cliente = ' + req.body.id_cliente + ', vermelho = ' + req.body.vermelho + 
    ', preto = ' + req.body.preto + ', branco = ' + req.body.branco + ' where id_pedido = '+
		req.body.id_pedido , function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); // servidor retorna a consulta em formato json
  });
});
});



app.listen(3000)


