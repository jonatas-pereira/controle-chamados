import { api } from "../api";
import type { Chamado } from "./interface/Chamado";

export async function criarChamado(chamado: Chamado) {
  const { data } = await api.post("/chamado", chamado)
  return data
}
