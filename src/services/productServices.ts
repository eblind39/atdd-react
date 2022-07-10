import {API_URL} from '../app/config'

const saveProduct = () =>
    fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: 'Socks', size: 'M', type: 3}),
    })

export default saveProduct
