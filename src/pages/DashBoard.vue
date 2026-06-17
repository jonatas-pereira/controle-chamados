<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const menuAberto = ref(false)
const itemAtivo = ref('dashboard')

const menuItems = [
  { id: '/', nome: 'Chamados', icone: '📋' },
  { id: '/cadastroChamado', nome: 'Novo Chamado', icone: '➕' },
]

const paginaAtual = ref('Dashboard')

const selecionarItem = (id: string) => {
  itemAtivo.value = id
  const item = menuItems.find(i => i.id === id)
  paginaAtual.value = item ? item.nome : 'Dashboard'
  menuAberto.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow-md z-30 sticky top-0">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-3">
          <button
            @click="menuAberto = !menuAberto"
            class="p-2 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Abrir menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="text-xl font-bold text-gray-800">Sistema de Chamados</h1>
        </div>
        <div class="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-semibold">
          U
        </div>
      </div>
    </header>
    <div class="flex flex-1">
      <div
        v-if="menuAberto"
        @click="menuAberto = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-20"
      ></div>
      <nav
        :class="[
          'fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transition-transform duration-300 ease-in-out',
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <div class="p-4 border-b flex justify-between items-center">
          <span class="text-lg font-bold text-gray-800">Menu</span>
          <button
            @click="menuAberto = false"
            class="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4 space-y-2">
          <RouterLink
            v-for="item in menuItems"
            :key="item.id"
            @click="selecionarItem(item.id)"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left"
            :class="itemAtivo === item.id 
              ? 'bg-cyan-50 text-cyan-700 font-medium' 
              : 'text-gray-700 hover:bg-gray-50'"
            :to="item.id"
          >
            <span class="text-xl">{{ item.icone }}</span>
            {{ item.nome }}
          </RouterLink>
        </div>
      </nav>
      <main class="flex-1 p-4">
        <div class="bg-white rounded-xl shadow-md p-6">
          <RouterView></RouterView>
        </div>
      </main>
    </div>
  </div>
</template>

