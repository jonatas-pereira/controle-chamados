import { createRouter, createWebHistory } from "vue-router"

import DashBoard from "../pages/DashBoard.vue"
import Chamados from "../pages/Chamados.vue"
import Chamado from "../pages/Chamado.vue"
import CadastroChamado from "../pages/CadastroChamado.vue"

const routes =  [
  {
    path: "/",
    component: DashBoard,
    children: [
      {
        path: "",
        component: Chamados
      },
      {
        path: "/cadastroChamado", 
        component: CadastroChamado
      },
      {
        path: "/chamado/:id",
        component: Chamado
      }
    ]
  },
]

const appRouter = createRouter({
  history: createWebHistory(),
  routes
})

export default appRouter
