import { api } from "../api";
import type { Atendente } from "./interface/Atendente";

export async function buscarAtendentes(): Promise<Atendente[]> {
  const res = await api.get<Atendente[]>("/atendente");
  return res.data;
    
}
