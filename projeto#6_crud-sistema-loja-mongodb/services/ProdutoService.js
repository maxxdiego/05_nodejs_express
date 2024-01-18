import produtos from "../models/Produto.js";
import mongoose from "mongoose";

const Produtos = mongoose.model("Produtos", produtos);

class ProdutoService {
  Create(nome, preco, categoria) {
    const newProduto = new Produtos({
      nome: nome,
      preco: preco,
      categoria: categoria,
    });
    newProduto.save();
  }

  GetAll() {
    const produtos = Produtos.find();
    return produtos;
  }

  GetOne(id) {
    const produtos = Produtos.findOne({ _id: id });
    return produtos;
  }

  Delete(id) {
    Produtos.findByIdAndDelete(id)
      .then(() => {
        console.log(`Cliente com a id: ${id} foi deletado.`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  Update(id, nome, preco, categoria) {
    Produtos.findByIdAndUpdate(id, {
      nome: nome,
      preco: preco,
      categoria: categoria,
    })
      .then(() => {
        console.log(`Dados do cliente com id: ${id} alterados com sucesso.`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new ProdutoService();
