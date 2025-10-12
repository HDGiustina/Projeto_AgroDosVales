const GetErrorMessage = (error) => {
  const errorData = error.response && error.response.data
  const errorMessage =
    (errorData && (errorData.mensagem || errorData.message)) ||
    'Não foi possível completar a operação'
  const errorFields = (error.response && errorData.errors) || {}
  const definedError = errorData.error
  const fieldsMessage = Object.values(errorFields).join('\n')

  const finalMessage = definedError || (fieldsMessage ? errorMessage + '\n' + fieldsMessage
    : errorMessage)

  return finalMessage
}

export {
  GetErrorMessage
}
