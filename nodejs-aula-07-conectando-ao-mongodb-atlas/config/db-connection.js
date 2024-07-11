// Importando o mongoose
import mongoose from "mongoose";
// Importando as variáveis de ambiente
import dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connect = () => {
  mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.0fbo3m5.mongodb.net/loja?retryWrites=true&w=majority&appName=Cluster0`
  );

  const connection = mongoose.connection;

  connection.on("error", () => {
    console.log("Erro ao conectar com o mongoDB.");
  });

  connection.on("open", () => {
    console.log("Conectado ao mongoDB com sucesso!");
  });
};

connect();

export default mongoose;
