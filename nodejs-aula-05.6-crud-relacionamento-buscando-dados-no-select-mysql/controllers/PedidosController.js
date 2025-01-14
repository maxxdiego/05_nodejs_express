import express from "express";
import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";
const router = express.Router();

// ROTA PEDIDOS
router.get("/pedidos", function (req, res) {
  // Realiza ambas as consultas em paralelo
  Promise.all([
    Pedido.findAll({
      include: [
        {
          model: Cliente, // Inclui o modelo Cliente relacionado
          required: true, // Opcional: Garante que somente pedidos com clientes associados sejam retornados
        },
      ],
    }),
    Cliente.findAll(), // Busca todos os clientes
  ])
    .then(([pedidos, clientes]) => {
      res.render("pedidos", {
        pedidos: pedidos,
        clientes: clientes, // Passa o array de clientes para a view
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar dados: ", error);
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
  })
    .then(() => {
      res.redirect("/pedidos");
    })
    .catch((error) => {
      console.log(error);
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
