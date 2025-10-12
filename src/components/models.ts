export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export type Artigo = {
  id: number;
  titulo: string;
  descricao: string;
  link: string;
  miniatura: string;
  ativo?: boolean;
  criado_por?: string;
}
export interface ArtigosList {
  index: number;
  label?: string;
  link?: string;
  textY: number;
  y: number;
}

export interface ArtigosListBkp {
  index: number;
  y: number;
  textY: number;
}
