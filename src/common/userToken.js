

const tokenKey = 'authToken'

let  getUserToken = () => {
    let token = sessionStorage.getItem(tokenKey)
    if (token){
        return token
    }
    else {
        return undefined
    }
}

export default getUserToken