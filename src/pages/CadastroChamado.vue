<script setup lang="ts">
import { api } from '../services/api';
import { onMounted, ref, watch } from 'vue';
import type { Atendente } from '../services/atendente/interface/Atendente';
import type { CreateChamado } from '../services/chamado/interface/CreateChamado';
import { createChamadoSchema } from '../validation/validacao';
import type { Chamado } from '../services/chamado/interface/Chamado';
import { criarChamado } from '../services/chamado/criarChamado';
import { toast } from 'vue-sonner';
import axios from 'axios';

const atendentes = ref<Atendente[]>()
const errors = ref<Record<string, string[]>>({})
const chamado = ref<CreateChamado>({
  titulo: "",
  descricao: "",
  prioridade: "Baixa",
  estado: "Aberto",
  atendenteId: ""
})

const touched = ref({
  titulo: false,
  descricao: false,
  atendenteId: false,
})

async function getAtendente() {
  try {
    const res = await api.get("atendente")
    return res.data
  } catch(error) {
    console.log(error)
  }
}

async function handleCriarChamado() {
  const obj = {
    titulo: chamado.value.titulo,
    descricao: chamado.value.descricao,
    prioridade: chamado.value.prioridade,
    estado: chamado.value.estado,
    atendenteId: chamado.value.atendenteId
  } as Chamado
  try {
    await criarChamado(obj)
    toast.success("Chamado criado com sucesso!")
    chamado.value.titulo = "",
    chamado.value.descricao = "",
    chamado.value.prioridade = "Baixa",
    chamado.value.atendenteId = ""
    touched.value.titulo = false,
    touched.value.descricao = false,
    touched.value.atendenteId = false
  } catch(error) {
    if(axios.isAxiosError(error)) {
      toast.error("Não foi possível criar o chamado")
    }
  }
}

onMounted(async () => {
  const data = await getAtendente()
  atendentes.value = data
})

watch(
  chamado,
  () => {
    const result = createChamadoSchema.safeParse(chamado.value)

    errors.value = result.success
      ? {}
      : result.error.flatten().fieldErrors
  },
  { deep: true }
)
</script>

<template>
  <div class="max-w-xl mx-auto">
    <form
      @submit.prevent="handleCriarChamado"
      class="bg-white rounded-xl shadow-md p-6 space-y-4"
    >
      <h1 class="text-2xl font-bold text-gray-800">
        Novo Chamado
      </h1>
      <div>
        <label
          for="titulo"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Título
        </label>
        <input
          id="titulo"
          type="text"
          placeholder="Digite o título"
          v-model="chamado.titulo"
          @input="touched.titulo = true"
          :class="[
            'w-full p-3 rounded-lg border transition',
            touched.titulo && errors.titulo
              ? 'border-red-500 focus:ring-red-300'
              : 'border-gray-300 focus:ring-cyan-300'
          ]"
        />
        <p
          v-if="touched.titulo && errors.titulo"
          class="text-red-600 text-sm mt-1"
        >
          {{ errors.titulo[0] }}
        </p>
      </div>
      <div>
        <label
          for="descricao"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Descrição
        </label>
        <textarea
          id="descricao"
          rows="4"
          placeholder="Digite a descrição"
          v-model="chamado.descricao"
          @input="touched.descricao = true"
          :class="[
            'w-full p-3 rounded-lg border transition resize-none',
            touched.descricao && errors.descricao
              ? 'border-red-500 focus:ring-red-300'
              : 'border-gray-300 focus:ring-cyan-300'
          ]"
        ></textarea>
        <p
          v-if="touched.descricao && errors.descricao"
          class="text-red-600 text-sm mt-1"
        >
          {{ errors.descricao[0] }}
        </p>
      </div>
      <div>
        <label
          for="atendente"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Atendente
        </label>
        <select
          id="atendente"
          v-model="chamado.atendenteId"
          class="w-full p-3 rounded-lg border border-gray-300 focus:ring-cyan-300"
        >
          <option value="">
            Selecione um atendente
          </option>
          <option
            v-for="atendente in atendentes"
            :key="atendente.id"
            :value="atendente.id"
          >
            {{ atendente.nome }}
          </option>
        </select>
      </div>
      <div>
        <label
          for="prioridade"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Prioridade
        </label>
        <select
          id="prioridade"
          v-model="chamado.prioridade"
          class="w-full p-3 rounded-lg border border-gray-300 focus:ring-cyan-300"
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
      <button
        type="submit"
        :disabled="Boolean(errors.titulo) || Boolean(errors.descricao) || !touched.titulo"
        class="w-full bg-cyan-700 text-white py-3 rounded-lg font-medium transition hover:bg-cyan-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Criar Chamado
      </button>
    </form>
  </div>
</template>

<style scoped></style>
