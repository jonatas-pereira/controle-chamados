import z from "zod";

export const createChamadoSchema = z.object({
  titulo: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),

  descricao: z
    .string()
    .min(5, 'A descrição deve ter pelo menos 5 caracteres')
    .max(1000, 'A descrição deve ter no máximo 1000 caracteres'),
})

export type CreateChamado = z.infer<
  typeof createChamadoSchema
>
