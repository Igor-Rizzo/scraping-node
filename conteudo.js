const axios = require("axios");
const cheerio = require("cheerio");

const recebeUrl = async (url) => {
  const result = await axios.get(url);
  return result.data;
};
const pegarConteudo = async (url) => {
  const content = await recebeUrl(url);
  const $ = cheerio.load(content);

  let tituloPagina = $(".title > h1").text();
  let dataPublicacao = $(".content-publication-data__updated").text();
  let conteudoPagina = $(".content-text__container ").text();

  return {
    titulo: tituloPagina,
    data: dataPublicacao,
    conteudo: conteudoPagina,
  };
};

module.exports = pegarConteudo;
