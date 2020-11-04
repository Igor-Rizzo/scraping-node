const mysql = require("mysql");

function addBanco(link, item) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodecrawler",
  });
  let sqlConsulta = "SELECT linkPagina FROM pagina WHERE linkPagina  = ?";
  connection.query(sqlConsulta, [link], function (error, res) {
    if (res.length == 0) {
      let sqlInserirDados =
        "INSERT INTO pagina (linkPagina, tituloPagina, dataPublicacao, conteudoPagina) VALUES (?,?,?,?)";
      let valores = [link, item.titulo, item.data, item.conteudo];
      connection.query(sqlInserirDados, valores, function (error, res) {
        if (error) {
          console.log(error.message);
          connection.end();
        } else {
          console.log("Sucesso em inserir os dados.");
          connection.end();
        }
      });
    } else {
      console.log("Item ja existente no banco de dados.");
      connection.end();
    }
  });
}
module.exports = addBanco;

/*
    if(res !== null && res.length == 0){
      connection.query(`INSERT INTO pagina (linkPagina, tituloPagina, dataPublicacao,conteudoPagina) VALUES (\'${link}\', '${item.titulo}', '${item.data}', '${item.conteudo}')`, function(error){
        if(error){
          console.log(error.message)
          connection.end()
        }else{
          console.log('Sucesso, você conseguiu meu jovem gafanhoto')
          connection.end()
        }
      }) 
    }else{
      console.log(res)
      connection.end()
      //console.log("Informações já inseridas")
    } 

*/
