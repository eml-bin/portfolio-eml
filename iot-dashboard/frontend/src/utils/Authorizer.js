export const Authorizer = () => {

    const tkn = localStorage.getItem('tkn')


    return `Bearer ${tkn ? tkn : 'null'}`
}