const getErrorMessage = (status: number) => {
  let message = ''
  switch (status) {
    case 403:
      message =
        'Too many requests. Forbidden request. Please try again later or add an authentication token.'
      break
    case 404:
      message =
        'User not found. Please check the GitHub username and try again.'
      break
    case 500:
      message = 'GitHub server error. Please try again later.'
      break
    default:
      break
  }

  return message
}

const handleFetchError = (response: Response) => {
  if (!response.ok) {
    throw new Error(getErrorMessage(response.status))
  }
}

export { getErrorMessage, handleFetchError }
