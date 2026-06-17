export interface Chamado {
  id?: string

  titulo?: string
  descricao?: string

  estado?: string

  prioridade?: string

  atendenteId?: string

  atendente?: {
    id: string
    nome?: string
  }

  created_at?: string
  updated_at?: string
}
