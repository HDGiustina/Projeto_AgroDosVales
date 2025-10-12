const requiredRule = (val: string) => (val && val.length > 0) || 'Campo obrigatório.'

const requiredSelectRules = (val: number | undefined) => !!val || 'Por favor, é obrigatório ser selecionar uma opção para continuar '

const requiredFilesRules = (val: File | undefined) => !!val || 'Por favor, é obrigatório escolher uma imagem'

export {
  requiredRule,
  requiredSelectRules,
  requiredFilesRules
}
