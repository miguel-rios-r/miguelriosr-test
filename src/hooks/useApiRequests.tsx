const useApiRequests = () => {
  const request = async (method: string, url: string, body?: any) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`)
      }

      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      console.log("Request finished")
    }
  }

  const get = (url: string) => request("GET", url)
  const post = (url: string, body: any) => request("POST", url, body)
  const put = (url: string, body: any) => request("PUT", url, body)
  const del = (url: string) => request("DELETE", url)

  return { get, post, put, del }
}

export default useApiRequests
