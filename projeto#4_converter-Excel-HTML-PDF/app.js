import Reader from './Reader.js'
import Processor from './Processor.js'
import Table from './Table.js'
import HtmlParser from './HtmlParser.js'
import Writer from './Writer.js'
import PdfWriter from './PdfWriter.js'


async function main(){
    let dados = await Reader.Read('./users.csv')    
    let dadosProcessados = Processor.Process(dados)

    let usuarios = new Table(dadosProcessados)

    // console.log(usuarios.rows)

    const html = await HtmlParser.Parse(usuarios)
    
    Writer.writer(`./files/${Date.now()}.html`, html)
    PdfWriter.WritePDF(`./files/${Date.now()}.pdf`, html)
}

main()

