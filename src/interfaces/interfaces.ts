export interface UpdateFunction {
  (callbackFn: () => void, afterFn?: (ref?: unknown) => void): void;
}

export interface SubMenuInterface {
  icon: string;
  titulo: string;
  destino?: string
  name: string
}

export interface MenuInterface {
  icon: string;
  label: string;
  path?: string;
  destino?: string;
  submenus?: SubMenuInterface[];
  can: boolean
  name: string
}

export interface IconListInterface {
  'app:inova': string
}

export interface atualizacoesInterfaces {
  id: number,
  titulo: string,
  descricao: string
  miniatura: string,
  tipo: string,
  arquivo: string
  link: string
  link_inscricao: string,
  created_at: string,
  data_realizacao: string,
  inscricao_ate: string
}

export interface MappedDetalhe {
  field: string,
  value?: string | number | { descricao?: string, link?: string }[] | null,
  domelement?: boolean | null
}

export interface Interesse {
  id: number,
  interesse_id?: number,
  descricao: string
}

export interface Indicacao {
  id: number,
  descricao: string,
  ativo: boolean
}

export interface Industria {
  id?: number,
  interessesEm?: string,
  fantasia: string,
  razao_social: string,
  plantasNomes?: string,
  miniatura: string | File,
  uploadImg?: File,
  estado: string,
  ativo?: boolean | number,
  localizacao?: string,
  link?: string,
  contato?: string,
  endereco?: string,
  cidade: string
  cep: string,
  updated_at?: string,
  plantas?: import('./interfaces').Planta[],
  interesses?: import('./interfaces').Interesse[]
}

export interface Produtor {
  id?: number,
  nome: string;
  localizacao: string;
  created_at: string;
  updated_at: string,
  quantidade_estimada?: string,
  data_estimada?: string,
  miniatura: string;
  telefone: string,
  email: string,
  estado?: string,
  cep: string,
  cidade: string,
  plantasNomes?: string,
  plantas: import('./interfaces').Planta[]
}

export interface PlantasProdutor {
  planta_id?: string | number,
  producao_est?: string | number,
  data_entrega_est?: string
}

export interface Artigo {
  id: number,
  titulo: string,
  descricao: string,
  link: string,
  miniatura: string | File,
  uploadImg?: File,
  ativo?: boolean | number,
  arquivo: File | string,
  uploadArtigo?: File,
  updated_at: string,
  criado_por: string,
  plantas?: import('./interfaces').Planta[]
  interesses?: Interesse[],
}

export interface Planta {
  id: number,
  planta_id: string,
  nome_cientifico: string,
  nome_popular: string,
  contraindicacao?: string,
  contraindicacoes?: number[],
  imagem: string | File,
  uploadImg?: File,
  ativo?: boolean | number,
  autor?: string,
  sinonimia?: string,
  updated_at?: string,
  n_industrias: number | string,
  n_produtores: number | string,
  indicacoesUso: string,
  data_entrega_est: string,
  producao_est: string,
  indicacoes?: import('./interfaces').Indicacao[],
  industrias?: import('./interfaces').Industria[],
  artigos?: import('./interfaces').Artigo[],
  cursos?: import('./interfaces').Curso[],
  key?: Array<string> | File | string | undefined | number
}

export interface Curso {
  id: number,
  titulo: string,
  inscricao_de: string,
  inscricao_ate: string,
  data_inicio: string,
  data_fim: string,
  link_inscricao: string,
  descricao: string,
  local: string,
  duracao: string,
  miniatura: string | File,
  uploadImg?: File,
  ativo: boolean | number,
  criado_por: string,
  created_at: string,
  plantas?: import('./interfaces').Planta[],
  eventos?: import('./interfaces').Evento[],
  artigos?: import('./interfaces').Artigo[],
  interesses: import('./interfaces').Interesse[]
}

export interface Evento {
  id: number,
  titulo: string,
  inscricao_de: string,
  inscricao_ate: string,
  data_realizacao: string,
  link_inscricao: string,
  descricao: string,
  local: string,
  duracao: number | undefined,
  miniatura: string | File,
  uploadImg?: File,
  ativo: boolean | number,
  criado_por: string,
  created_at: string,
  plantas?: import('./interfaces').Planta[],
  cursos?: import('./interfaces').Curso[],
  artigos?: import('./interfaces').Artigo[],
  interesses: import('./interfaces').Interesse[],
  industrias?: import('./interfaces').Industria[],
}

export interface MarkedDatesInterface {
  [key: string]: {
    dates: string[]
  }
}

export interface PatrocinadoresInterface {
  id: number,
  ativo: boolean,
  descricao: string,
  logo: string
}

export interface UserInterface {
  id: number,
  nome: string,
  email: string,
  tipo_usuario: string,
  telefone: string,
  cidade: string,
  cep: string,
  estado: string,
  validade?: string,
  criado_por?: string,
  created_at: string,
  updated_at: string,
  industria_id?: string,
  miniatura?: string,
  firstName?: string
}

export interface PlantasInterface {
  planta_id: number,
  producao_est: number,
  data_entrega_est: string
}

export interface CadastrolInterface {
  id: number,
  planta_id?: number,
  nome: string,
  email: string,
  localizacao: string,
  senha?: string | null,
  data_estimada: string,
  quantidade_estimada: string,
  tipo_usuario: string,
  cidade: string,
  miniatura: string | File,
  uploadImg?: File,
  telefone: string,
  privacidade: boolean,
  industria: import('./interfaces').Industria[],
  plantas?: import('./interfaces').Planta[],
  validade?: string
  ativo?: boolean | number,
  cep: string,
  estado: string
}

export interface PlantaCadProdutor {
  planta_id?: number;
  producao_est?: string;
  data_entrega_est?: string;
}

export interface NovoCadastroInterface {
  id: number;
  nome: string;
  email: string;
  localizacao: string;
  senha: string | null | undefined;
  miniatura: string | File;
  telefone: string;
  cep: string;
  plantas: PlantasProdutor[];
}

export interface NovoCadastroInteressadoInterface {
  id: number;
  nome: string;
  email: string;
  cidade: string;
  senha: string | null | undefined;
  miniatura: string | File;
  telefone: string;
  cep: string;
  planta_id?: []
  interesse_id?: []
  plantas: { planta_id: number }[]
  interesses: { interesse_id: number }[]
}

export interface newInteresseInterface {
  nome: string,
  email: string,
  senha: string,
  tipo_usuario: string,
  cidade: string,
  cep: string,
  telefone: string,
  estado: string,
  planta_id?: []
  interesse_id?: []
  plantas: { planta_id: number }[]
  interesses: { interesse_id: number }[]
}

export interface newProdutorInterface {
  nome: string,
  email: string,
  senha: string,
  tipo_usuario: string,
  cidade: string,
  cep: string,
  quantidade_estimada: string,
  data_estimada: string,
  telefone: string,
  estado: string,
  planta_id?: number
  plantas: PlantaCadProdutor[],
}

export interface newIndustriaInterface {
  id?: number,
  nome: string,
  email: string,
  senha: string,
  tipo_usuario: string,
  cidade: string,
  cep: string,
  link: string,
  estado: string,
  localizacao: string,
  plantas?: import('./interfaces').Planta[],
  interesse?: import('./interfaces').Interesse[]
}

export interface UsuarioAdmInterface {
  email: string,
  nome: string,
  senha: string,
  validade: string
}

export interface indicacaoInterface {
  id?: number,
  descricao: string | Array<string>,
  ativo: boolean | number,
  plantas?: import('./interfaces').Planta[],
}

export interface TableDataInterface {
  id?: number,
  quantidade_estimada: string,
  data_estimada: string
}
