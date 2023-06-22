export const HttpClient = async (url, options) => {
    const response = await fetch(url, options)
    
    // DEBUG
    // console.log('HTTP-Client: ', response)
    
    const data = await response.json()
    
    return {
        code: response.status,
        statusText: response.statusText,
        response: response,
        data
    }
}