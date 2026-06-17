<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Chamado } from '../services/chamado/interface/Chamado';
import type { Atendente } from '../services/atendente/interface/Atendente';
import { toast } from 'vue-sonner';
import { buscarAtendentes } from '../services/atendente/buscarAtendentes';
import { formatarDataHora } from '../utils/formataData';
import { deletarChamado } from '../services/chamado/deletarChamado';
import { buscarChamado } from '../services/chamado/buscarChamados';
import axios from 'axios';
import { atualizarChamado } from '../services/chamado/atualizarChamado';


const route = useRoute()
const router = useRouter()
const id = route.params.id
const chamadoData = ref<Chamado>({
  titulo: "",
  descricao: "",
  prioridade: "Baixa", 
  estado: "Aberto",
  atendente: {
    id: "",
    nome: ""
  },
  created_at: ""
})
const atualizaTitulo = ref("")
const atualizaDescricao = ref("")
const atualizaPrioridade = ref("")
const atualizaEstado = ref("")
const atualizaAtendente = ref("")
const editar = ref(false)
const atendentes = ref<Atendente[]>()
const loading = ref(false)
const atendenteSelecionado = ref("")
const atendentesFiltrados = ref<Atendente[]>([])
const estadosFiltrados = ref(["Aberto", "Em andamento", "Fechado"])
const prioridadesFiltradas = ref(["Baixa", "Média", "Alta"])
const camposAtualizados = ref(false)
const atualizado = ref(false)

onMounted(() => {
  carregarDados()
})

watch(
  [atualizaTitulo, atualizaDescricao, atualizaEstado, atualizaPrioridade, atualizaDescricao],
  () => {
    if(atualizaTitulo.value !== chamadoData.value.titulo || atualizaDescricao.value !== chamadoData.value.descricao || atualizaPrioridade.value !== chamadoData.value.prioridade || atualizaEstado.value !== chamadoData.value.estado || atualizaAtendente.value !== chamadoData.value.atendente?.id) {
      atualizado.value = true
  }
  }
)

async function carregarDados() {
  try {
    loading.value = true
    const data = await buscarChamado(String(id))
    chamadoData.value = data
    atendenteSelecionado.value = chamadoData.value.atendente?.nome as string
    const atendentesData = await buscarAtendentes()
    atendentes.value = atendentesData
    atualizaTitulo.value = chamadoData.value.titulo as string
    atualizaDescricao.value = chamadoData.value.descricao as string
    removeDaLista()
  } catch(error) {
    if(axios.isAxiosError(error)) {
      toast.error("Erro ao carregar os dados")
    }
  }
}

async function handleSubmit() {
  const atualizaChamado = {
    ...(atualizaTitulo.value !== chamadoData.value.titulo && atualizaTitulo.value !== "" && { titulo: atualizaTitulo.value}),
    ...(atualizaDescricao.value !== chamadoData.value.descricao && atualizaDescricao.value !== "" && { descricao: atualizaDescricao.value}),
    ...(atualizaEstado.value !== chamadoData.value.estado && atualizaEstado.value !== "" && { estado: atualizaEstado.value}),
    ...(atualizaPrioridade.value !== chamadoData.value.prioridade && atualizaPrioridade.value !== "" && { prioridade: atualizaPrioridade.value}),
    ...(atualizaAtendente.value !== chamadoData.value.atendenteId && atualizaAtendente.value !== "" && { atendenteId: atualizaAtendente.value})
  }
  try {
    await atualizarChamado(String(id), atualizaChamado)
    toast.success("Chamado atualidado com sucesso")
    await carregarDados()
    editar.value = false
  } catch(error) {
    if(axios.isAxiosError(error)) {
      toast.error("Erro ao atualizar o chamado")
    }
  }
  if(camposAtualizados) {
    console.log()
    carregarDados()
    atualizado.value = false
  }
}

async function handleDelete() {
  try {
    await deletarChamado(String(id))
    toast.success("Chamado deletado com sucesso")
    router.push("/")
  } catch(erro) {
    if(axios.isAxiosError(erro)) {
      toast.error("Erro ao apagar chamado " + erro.message)
    }
  }
}

function removeDaLista() {
  atendentesFiltrados.value = atendentes.value?.filter((el) => el.id != chamadoData.value.atendente?.id) as Atendente[]
  estadosFiltrados.value = estadosFiltrados.value.filter((el) => el != chamadoData.value.estado)
  prioridadesFiltradas.value = prioridadesFiltradas.value.filter((el) => el != chamadoData.value.prioridade)
}

function redefinirValores() {
  atualizaTitulo.value = chamadoData.value.titulo as string
  atualizaDescricao.value = chamadoData.value.descricao as string
  atualizado.value = false
}
</script>

<template>
  <form
    @submit.prevent=""
    class="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
  >
    <h1 
      class="text-xl font-bold text-gray-800"
    >
      Chamado para {{ chamadoData.atendente?.nome?.split(" ")[0] }}
    </h1>
    <div class="flex justify-end gap-2">
      <button
        v-on:click="() => { editar = !editar; redefinirValores() }"
        type="submit"
        class="w-fit bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-300 transition"
      >
        {{ editar ? "Cancelar" : "Editar"}}
      </button>
      <button
        v-on:click="handleDelete"
        type="submit"
        class="w-fit bg-red-600 text-white py-2 px-3 rounded hover:bg-red-300 transition"
        v-if="editar ? false : true"
      >
        Excluir
      </button>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-600 mb-1">
        Título
      </label>

      <input
        v-if="editar"
        v-model="atualizaTitulo"
        type="text"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
      <p
        v-if="!editar"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {{ chamadoData.titulo }}
      </p>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-600 mb-1">
        Descrição
      </label>

      <textarea
        v-model="atualizaDescricao"
        v-if="editar"
        rows="4"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
      <textarea
        v-model="chamadoData.descricao"
        disabled
        v-if="!editar"
        rows="4"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
    </div>
    <div v-if="editar">
      <label class="block text-sm font-medium text-gray-600 mb-1">
        Estado
      </label>
      <select
        :disabled="editar ? false : true"
        v-model="atualizaEstado"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Selecione</option>
        <option v-for="estado in estadosFiltrados">
          {{ estado }}
        </option>
      </select>
    </div>
    <div v-if="!editar">
      <label class="block text-sm font-medium text-gray-600 mb-1">
        Estado
      </label>
      <input
        disabled
        :value="chamadoData.estado"
        type="text"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
    </div>
    <div v-if="editar">
      <label class="block text-sm font-medium text-gray-600 mb-1">
        Prioridade
      </label>

      <select
        :disabled="editar ? false : true"
        v-model="atualizaPrioridade"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Selecione</option>
        <option v-for="prioridade in prioridadesFiltradas">
          {{ prioridade }}
        </option>
      </select>
    </div>
    <div v-if="!editar">
      <label class="block text-sm font-medium text-gray-600 mb-1">
        Prioridade
      </label>
      <input
        disabled
        :value="chamadoData.prioridade"
        type="text"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
    </div>
    <div v-if="editar">
      <label
        for="atendente"
        class="block text-sm font-medium text-gray-600 mb-1"
      >
        Atendente
      </label>
      <select
        id="atendente"
        v-model="atualizaAtendente"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option 
          value=""
        >
          Selecione
        </option>
        <option
          v-for="atendente in atendentesFiltrados"
          :key="atendente.id"
          :value="atendente.id"
          v-if="editar"
        >
          {{ atendente.nome }}
        </option>
      </select>
    </div>
    <div v-if="!editar">
      <label class="block text-sm font-medium text-gray-600 mb-1">
        Atendente
      </label>
      <input
        disabled
        :value="chamadoData.atendente?.nome"
        type="text"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
    </div>
    <div v-if="!editar">
      <label class="block text-sm font-medium text-gray-600 mb-1">
        Data
      </label>
      <input
        disabled
        :value="formatarDataHora(chamadoData.created_at as string)"
        type="text"
        class="w-full border border-zinc-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
    </div>
    <button
      v-if="editar"
      :disabled="!atualizado"
      type="submit"
      class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      v-on:click="handleSubmit"
    >
      Salvar alterações
    </button>
  </form>
</template>

<style scoped></style>
