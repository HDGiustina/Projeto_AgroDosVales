import { MenuInterface } from 'src/interfaces/interfaces'

const menus: MenuInterface[] = [
  {
    icon: 'app:Home',
    label: 'Home',
    destino: '/home',
    can: true,
    name: 'home'
  },
  {
    icon: 'app:Produtos',
    label: 'Produtos',
    destino: '/lbioativas',
    can: true,
    name: 'produtoslogado'
  },
  {
    icon: 'app:Eventos',
    label: 'Eventos',
    destino: '/leventos',
    can: true,
    name: 'evtlogado'
  },
  {
    icon: 'app:Aprendizado',
    label: 'Aprendizado',
    destino: '/leducacao',
    can: true,
    name: 'plantas'
  },
  {
    icon: 'app:Cadastro',
    label: 'Cadastros',
    can: false,
    name: '',
    submenus: [
      {
        icon: 'app:AdmCad',
        titulo: 'Admininstrador',
        destino: '/cadastrosadmin',
        name: 'adminstrador'
      },
      {
        icon: 'app:PlantaCad',
        titulo: 'Planta',
        destino: '/cadastrosplantas',
        name: 'planta'
      },
      {
        icon: 'app:EventoCad',
        titulo: 'Evento',
        destino: '/cadastrosevt',
        name: 'evento'
      },
      {
        icon: 'app:CursoCad',
        titulo: 'Curso',
        destino: '/cadastroscurso',
        name: 'curso'
      },
      {
        icon: 'app:ArtigoCad',
        titulo: 'Artigo',
        destino: '/cadastrosartigos',
        name: 'artigo'
      },
      {
        icon: 'app:IndustriaCad',
        titulo: 'Indústria',
        destino: '/cadastrosindustrias',
        name: 'industria'
      },
      {
        icon: 'app:IndicacoesCad',
        titulo: 'Indicações de uso',
        destino: '/cadastrosindicacoes',
        name: 'indicacoes'
      },
      {
        icon: 'app:ContraindicacoesCad',
        titulo: 'Contra indicações de uso',
        destino: '/cadastroscontraindicacoes',
        name: 'indicacoes'
      }
    ]
  }
]

export default menus
