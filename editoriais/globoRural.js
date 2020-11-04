const axios = require('axios')
const cheerio = require('cheerio')
const pegarConteudo = require('../conteudo')
const addBanco = require('../newBanco')

const recebeUrl = async(url) => {
    const result = await axios.get(url)
    return result.data
}
const pegarLinkgloboRural = async() =>{
    const content = await recebeUrl('https://g1.globo.com/economia/agronegocios/globo-rural/')
    const $ = cheerio.load(content) 
        
    $('.feed-post-body').each((i, e) => {
        const link = $(e).find('a').attr('href')
        pegarConteudo(link).then(data => {
        //console.log(link, data)
        addBanco(link, data)
        })
        .catch(error => console.log(error))    
    })
}

module.exports = pegarLinkgloboRural;
//pegarLinkgloboRural()
