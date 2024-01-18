import pedidos from "../models/Pedidos.js";
import mongoose from "mongoose";

const Pedidos = mongoose.model("Pedidos", pedidos);

class PedidoService {
  Create(numero, valor) {
    const newPedido = new Pedidos({
      numero: numero,
      valor: valor,
    });
    newPedido.save();
  }

  GetAll() {
    const pedidos = Pedidos.find();
    return pedidos;
  }

  GetOne(id) {
    const pedidos = Pedidos.findOne({ _id: id });
    return pedidos;
  }

  Delete(id) {
    Pedidos.findByIdAndDelete(id)
      .then(() => {
        console.log(`Cliente com a id: ${id} foi deletado.`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  Update(id, numero, valor) {
    Pedidos.findByIdAndUpdate(id, {
      numero: numero,
      valor: valor,
    })
      .then(() => {
        console.log(`Dados do cliente com id: ${id} alterados com sucesso.`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new PedidoService();