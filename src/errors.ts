export const handleError = (error) => {
  if (error.response) {
    throw new Error(`${error.response.status} ${error.response.statusText}`)
  }
  else {
    throw error;
  }
};