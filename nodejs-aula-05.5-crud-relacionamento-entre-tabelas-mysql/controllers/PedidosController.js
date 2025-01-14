import express from "express";
import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";
const router = express.Router();

// ROTA PEDIDOS
router.get("/pedidos", function (req, res) {
  Pedido.findAll({
    include: [
      {
        model: Cliente, // Inclui o modelo Cliente relacionado
        required: true, // Opcional: Garante que somente pedidos com clientes associados sejam retornados
      },
    ],
  }).then((pedidos) => {
    res.render("pedidos", {
      pedidos: pedidos,
    });
    console.log(pedidos);
  });
});

// ROTA DE CADASTRO DE CLIENTES
router.post("/pedidos/new", (req, res) => {
  const numero = req.body.numero;
  const valor = req.body.valor;
  const clienteId = req.body.clienteId;
  Pedido.create({
    numero: numero,
    valor: valor,
    cliente_id: clienteId,
  }).then(() => {
    res.redirect("/pedidos");
  });
});

// ROTA DE EXCLUSÃO DE CLIENTES
router.get("/pedidos/delete/:id", (req, res) => {
  const id = req.params.id;
  Pedido.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/pedidos");
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router; //exportando o módulo "router"
