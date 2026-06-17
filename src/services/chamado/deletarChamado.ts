import { api } from "../api"

export async function deletarChamado(id: string) {
  const { data } = await api.delete(`/chamado/${id}`
  )
  return data
}
