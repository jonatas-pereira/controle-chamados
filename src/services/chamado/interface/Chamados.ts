export interface Chamados {
  id: string
  titulo: string
  prioridade: string
  estado: string
  atendente: {
    id: string,
    nome: string
  }
}
