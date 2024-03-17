export const checkError = (res: any) => {
  const status = res.data.string
  if (status === 'error') {
    throw new Error(res.data.error_message)
  }
}
