import express from "express";
import Cliente from "../models/Cliente.js";
import Endereco from "../models/Endereco.js";
const router = express.Router();

// ROTA CLIENTES
router.get("/clientes", function (req, res) {
  Cliente.findAll({
    include: [
      {
        model: Endereco,
        required: true, // Faz um INNER JOIN
      },
    ],
  }).then((clientes) => {
    res.render("clientes", {
      clientes: clientes,
    });
  });
});

// ROTA DE CADASTRO DE CLIENTES
router.post("/clientes/new", (req, res) => {
  const { nome, cpf, rua, numero, bairro } = req.body;

  // Primeiro, cria o endereço
  Endereco.create({
    rua: rua,
    numero: numero,
    bairro: bairro,
  })
    .then((novoEndereco) => {
      // Em seguida, cria o cliente com a referência ao endereço criado
      Cliente.create({
        nome: nome,
        cpf: cpf,
        endereco_id: novoEndereco.id, // Supondo que a coluna 'id' é a chave primária de Endereco
      });
    })
    .catch((error) => {
      console.log("Erro ao cadastrar cliente e endereço: ", error);
    });
  res.redirect("/clientes");
});

// ROTA DE EXCLUSÃO DE CLIENTES
router.get("/clientes/delete/:id", (req, res) => {
  const id = req.params.id;
  Cliente.findByPk(id, {
    include: [
      {
        model: Endereco,
        required: true, // Faz um INNER JOIN
      },
    ],
  }).then((cliente) => {
    Cliente.destroy({
      where: {
        id: id,
      },
    }).then(() => {
      Endereco.destroy({
        where: {
          id: cliente.endereco_id,
        },
      });
    });
    res.redirect("/clientes");
  });
});

// ROTA DE EDIÇÃO DE CLIENTES
router.get("/clientes/edit/:id", (req, res) => {
  const id = req.params.id;
  Cliente.findByPk(id, {
    include: [
      {
        model: Endereco,
        required: true, // Faz um INNER JOIN
      },
    ],
  }).then((cliente) => {
    res.render("clienteEdit", {
      cliente: cliente,
    });
  });
});

// ROTA DE ALTERAÇÃO DE CLIENTES
router.post("/clientes/update/:id", (req, res) => {
  const { id, nome, cpf, rua, numero, bairro, id_endereco } = req.body;

  Endereco.update(
    {
      rua: rua,
      numero: numero,
      bairro: bairro,
    },
    { where: { id: id_endereco } }
  )
    .then(() => {
      Cliente.update(
        {
          nome: nome,
          cpf: cpf,
        },
        { where: { id: id } }
      )
        .then(() => {
          res.redirect("/clientes");
        })
        .catch((error) => {
          console.log("Erro ao alterar cliente." + error);
        });
    })
    .catch((error) => {
      console.log("Erro ao alterar o endereço." + error);
    });
});

export default router; //exportando o módulo "router"
