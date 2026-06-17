import { api } from "../api"
import { type AtualizarChamado } from "./interface/atualizarChamado"

export async function atualizarChamado(id: string, chamado: AtualizarChamado) {
  const { data } = await api.patch(`/chamado/${id}`, chamado)
  return data
}
