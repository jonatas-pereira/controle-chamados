import { api } from "../api"
import type { Chamados } from "./interface/Chamados"

export async function buscarChamados(): Promise<Chamados[]> {
  const { data } = await api.get<Chamados[]>("chamado")
  return data
}

export async function buscarChamado(id: string) {
  const { data } = await api.get(`/chamado/${id}`)
  return data
}
