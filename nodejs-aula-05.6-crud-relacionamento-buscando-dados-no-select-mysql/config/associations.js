import Cliente from "../models/Cliente.js";
import Pedido from "../models/Pedido.js";

// Definindo as associações entre os modelos
const defineAssociations = () => {
  Cliente.hasMany(Pedido, { foreignKey: "cliente_id" });
  Pedido.belongsTo(Cliente, { foreignKey: "cliente_id" });
};

export default defineAssociations;
