const mysql  = require('mysql2');
const conexao = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'webapi'
});

function createTable(conn){
  const sql = `CREATE TABLE IF NOT EXISTS Clientes(
                ID int NOT NULL AUTO_INCREMENT,
                Nome varchar(150) NOT NULL,
                CPF char(11) NOT NULL,
                PRIMARY KEY (ID)
                );`;
  
  conn.query(sql, (error, results, fields) => {
      if(error) return console.log(error);
      console.log('criou a tabela!');
      addRows(conn);
  });
}


function addRows(conn){
  const sql = "INSERT INTO Clientes(Nome,CPF) VALUES ?";
  const values = [
        ['cliente1', '12345678901'],
        ['cliente2', '09876543210'],
        ['cliente3', '12312312399']
      ];
  conn.query(sql, [values], (error, results, fields) => {
          if(error) return console.log(error);
          console.log('adicionou registros!');
          conn.end();//fecha a conexão
      });
}

conexao.connect((err) => {
  if(err) return console.log(err);
  console.log('conectou!');
  createTable(conexao);
});