<script setup lang="ts">
import { api } from '../services/api';
import { onMounted, ref, watch } from 'vue';
import type { Chamados } from '../services/chamado/interface/Chamados';
import { RouterLink } from 'vue-router';
import type { Atendente } from '../services/atendente/interface/Atendente';
import { buscarAtendentes } from '../services/atendente/buscarAtendentes';
import { buscarChamados } from '../services/chamado/buscarChamados';
import axios from 'axios';
import { toast } from 'vue-sonner';

const chamados = ref<Chamados[]>([])
const atendentes = ref<Atendente[]>([])
const filtroAtendente = ref("")
const filtroPrioridade = ref("")
const buscaTitulo = ref("")
const estado = ref("")

onMounted(async () => {
  try {
    chamados.value = await buscarChamados()
  } catch (error) {
    if(axios.isAxiosError(error)) {
      toast.error("Houve um problema ao buscar os chamados")
    }
  }
  try {
    const res = await buscarAtendentes()
    atendentes.value = res
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error("Erro ao carregar lista de atendentes")
    }
  }
})

watch(
  [filtroAtendente, filtroPrioridade, buscaTitulo, estado],
  async () => {
    chamados.value = []
    try {
      const res = await api.get("/chamado", {
        params: {
          atendenteId: filtroAtendente.value,
          prioridade: filtroPrioridade.value,
          busca: buscaTitulo.value,
          estado: estado.value
        }
      })
      const data = res.data as Chamados[]
      chamados.value = data
    } catch(error) {
      if(axios.isAxiosError(error)) {
        toast.error("Erro ao buscar chamados")
      }
    }
  }
)

function redefinirFiltros() {
  filtroAtendente.value = ""
  filtroPrioridade.value = ""
  estado.value = ""
  buscaTitulo.value = ""
}
</script>

<template>
  <div>
    <h1 class="text-center font-bold from-neutral-800">Chamados</h1>
      <div class="bg-white rounded-lg shadow p-4 mb-4">
        <h2 class="text-md font-semibold text-gray-800 mb-4">
          Filtrar Chamados
        </h2>
        <form
          @submit.prevent
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div class="flex flex-col">
            <label
              for="atendente"
              class="text-sm font-medium text-gray-600 mb-1"
            >
              Atendente
            </label>
            <select
              v-model="filtroAtendente"
              id="atendente"
              class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Todos os atendentes</option>
              <option
                v-for="a in atendentes"
                :key="a.id"
                :value="a.id"
              >
                {{ a.nome }}
              </option>
            </select>
        </div>
        <div class="flex flex-col">
          <label
            for="prioridade"
            class="text-sm font-medium text-gray-600 mb-1"
          >
            Prioridade
          </label>
          <select
            v-model="filtroPrioridade"
            id="prioridade"
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Todas as prioridades</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label
            for="estado"
            class="text-sm font-medium text-gray-600 mb-1"
          >
            Estado
          </label>
          <select
            v-model="estado"
            id="estado"
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Todos os estados</option>
            <option value="Aberto">Aberto</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Fechado">Fechado</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label
            for="buscar"
            class="text-sm font-medium text-gray-600 mb-1"
          >
            Buscar por título
          </label>
          <input
            id="buscar"
            type="text"
            placeholder="Digite o título..."
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            v-model="buscaTitulo"
          />
        </div>
      </form>
    </div>
    <div class="flex mb-2 px-2 text-sm">
      <div class="flex-1 pr-1">Título</div>
      <div class="flex-1 pr-1">Atendente</div>
      <div class="flex-1 ">Prioridade</div>
      <div class="flex-1 pl-1">Estado</div>
    </div>
    <div class="border border-zinc-400 mb-3"></div>
    <div>
      <ul>
        <li
          v-for="chamado in chamados"
          :key="chamado.id"
          :class="`flex flex-col border p-2 mb-2 rounded-lg
            ${chamado.prioridade === `Baixa` && `bg-green-600 border-0 text-amber-50`}
            ${chamado.prioridade === `Média` && `bg-amber-600 border-0 text-amber-50`}
            ${chamado.prioridade === `Alta` && `bg-red-400 text-amber-50`}
          `"
        >
          <RouterLink :to="`/chamado/${chamado.id}`">
            <div class="flex text-sm py-3">
              <span class="flex-1 pr-1">{{ chamado.titulo }}</span>
              <span class="flex-1 pr-1">{{ chamado.atendente.nome }}</span>
              <span class="flex-1 ">{{ chamado.prioridade }}</span>
              <span class="flex-1 pl-1">{{ chamado.estado }}</span>
            </div>
          </RouterLink>
        </li>
        <div v-if="chamados?.length === 0">
          <li>Não foram encontrados resultados para busca</li>
          <button 
            v-on:click="redefinirFiltros"
            class="p-2 bg-green-700 rounded-lg text-amber-50"
          >
            Redefinir filtros
          </button>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
