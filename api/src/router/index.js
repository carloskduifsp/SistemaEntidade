import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: HomeView,
    meta: {
      requiresAuth: true,

    }
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/RegistroView.vue')
  },
  {
    path: '/redefinicao',
    name: 'redefinicao',
    component: () => import('../views/RedefinirSenha.vue')
  },
  {
    path: '/sistemas',
    name: 'Sistemas',
    component: () => import('../views/sistemas/ListagemSistemasView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/sistemas/cadastrarsistema',
    name: 'CadastroSistemas',
    component: () => import('../views/sistemas/CadastrarSistemaView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/sistemas/alterarsistema/:id',
    name: 'AlteracaoSitemas',
    component: () => import('../views/sistemas/AlterarSistemaView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/empresas',
    name: 'Empresas',
    component: () => import('../views/empresas/ListagemEmpresasView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/empresas/cadastrarempresa',
    name: 'CadastroEmpresas',
    component: () => import('../views/empresas/CadastrarEmpresaView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/empresas/alterarempresa/:id',
    name: 'AlteracaoEmpresas',
    component: () => import('../views/empresas/AlterarEmpresaView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/planos',
    name: 'Plano',
    component: () => import('../views/PlanoView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/planos/adicionarplano',
    name: 'AdicionarPlano',
    component: () => import('../views/AdicionarPlanoView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/planos/alterarplano/:id',
    name: 'AlterarPlano',
    component: () => import('../views/AlterarPlanoView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import('../views/clientes/ListagemClientesView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/clientes/cadastrarcliente',
    name: 'CadastroClientes',
    component: () => import('../views/clientes/CadastrarClienteView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/clientes/alterarcliente/:id',
    name: 'AlteracaoClientes',
    component: () => import('../views/clientes/AlterarClienteView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/clientesObras',
    name: 'Clientes',
    component: () => import('../views/clientesObras/ListagemClientesView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/clientesObras/cadastrarcliente',
    name: 'CadastroClientes',
    component: () => import('../views/clientesObras/CadastrarClienteView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/clientesObras/alterarcliente/:id',
    name: 'AlteracaoClientes',
    component: () => import('../views/clientesObras/AlterarClienteView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/fornecedores',
    name: 'Fornecedores',
    component: () => import('../views/ListagemFornecedoresView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/fornecedores/cadastrarfornecedor',
    name: 'CadastroFornecedores',
    component: () => import('../views/CadastrarFornecedorView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/fornecedores/alterarfornecedor/:id',
    name: 'AlteracaoFornecedores',
    component: () => import('../views/AlterarFornecedorView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/permissoes',
    name: 'Permissoes',
    component: () => import('../views/PermissoesView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/alterar/:id',
    name: 'Alterar',
    component: () => import('../views/AlterarPermissoes.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/reportbi/:idwork/:idrepo',
    name: 'ReportBI',
    component: () => import('../views/ReportShow.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: () => import('../views/workspace/WorkspaceListView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/workspace/cadastrarworkspace',
    name: 'CadastroWorkspace',
    component: () => import('../views/workspace/WorkspaceCadastrarView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/workspace/alterarworkspace/:id',
    name: 'AlteracaoWorkspace',
    component: () => import('../views/workspace/WorkspaceAlterarView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject)
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      store.state.error = "Primeiro, Faça Login."
      next("/login");
      return;
    }
  } else {
    next();
  }
});

export default router
