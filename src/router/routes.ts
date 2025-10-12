import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/lbioativas',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'lbioativas', path: '', component: () => import('pages/PlantasPage.vue') }]
  },
  {
    path: '/bioativas',
    component: () => import('layouts/LogoutLayout.vue'),
    children: [{ name: 'bioativas', path: '', component: () => import('pages/PlantasPage.vue') }]
  },
  {
    path: '/leventos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'leventos', path: '', component: () => import('pages/EventosPage.vue') }]
  },
  {
    path: '/eventos',
    component: () => import('layouts/LogoutLayout.vue'),
    children: [{ name: 'eventos', path: '', component: () => import('pages/EventosPage.vue') }]
  },
  {
    path: '/leducacao',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'leducacao', path: '', component: () => import('pages/EducacaoPage.vue') },
      { name: 'lreadPdf', path: '', component: () => import('pages/ReadPdfPage.vue') }
    ]
  },
  {
    path: '/educacao',
    component: () => import('layouts/LogoutLayout.vue'),
    children: [
      { name: 'educacao', path: '', component: () => import('pages/EducacaoPage.vue') },
      { name: 'readPdf', path: '', component: () => import('pages/ReadPdfPage.vue') }
    ]
  },
  {
    path: '/acess',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { name: 'login', path: '', component: () => import('pages/LoginCadastroPage.vue') },
      { name: 'cadastro', path: '', component: () => import('pages/LoginCadastroPage.vue') },
      { name: 'CadProdutor', path: '', component: () => import('pages/LoginCadastroPage.vue') },
      { name: 'CadInteressado', path: '', component: () => import('pages/LoginCadastroPage.vue') },
      { name: 'esqueci', path: '', component: () => import('pages/LoginCadastroPage.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'home', path: '', component: () => import('pages/HomePage.vue') }]
  },
  {
    path: '/cadastrosadmin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'adminstrador', path: '', component: () => import('pages/CadastrosPages/AdmCadastroPage.vue') }
    ]
  },
  {
    path: '/cadastrosplantas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'planta', path: '', component: () => import('pages/CadastrosPages/PlantaCadastroPage.vue') }
    ]
  },
  {
    path: '/cadastrosevt',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'evento', path: '', component: () => import('pages/CadastrosPages/EvtCadastroPage.vue') }
    ]
  },
  {
    path: '/cadastroscurso',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'curso', path: '', component: () => import('pages/CadastrosPages/CursoCadastroPage.vue') }
    ]
  },
  {
    path: '/cadastrosartigos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'artigo', path: '', component: () => import('pages/CadastrosPages/ArtigoCadastroPage.vue') }
    ]
  },
  {
    path: '/cadastrosindustrias',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'industria', path: '', component: () => import('pages/CadastrosPages/IndustriaCadastroPage.vue') }
    ]
  },
  {
    path: '/cadastrosindicacoes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'indicacoes', path: '', component: () => import('pages/CadastrosPages/IndicacoesCadastroPage.vue') }
    ]
  },
  {
    path: '/cadastroscontraindicacoes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'contraindicacoes', path: '', component: () => import('pages/CadastrosPages/ContraindicacoesCadastroPage.vue') }
    ]
  },
  {
    path: '/configuracoes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'configProdutor', path: '', component: () => import('pages/ConfiguracoesPage.vue') },
      { name: 'configIndustria', path: '', component: () => import('pages/ConfiguracoesPage.vue') },
      { name: 'configInteressado', path: '', component: () => import('pages/ConfiguracoesPage.vue') }
    ]
  },
  {
    path: '/recuperarsenha',
    name: 'recuperar',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RecuperarSenhaPage.vue') }
    ]
  },
  {
    path: '/plantavinculos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'plantasvinculos', path: '', component: () => import('pages/PlantaVinculosPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
