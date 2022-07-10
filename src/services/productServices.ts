import {API_URL} from '../app/config'
import {Product} from '../types/Product'

const saveProduct = (product: Product) =>
    fetch(`/productsMSW`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product),
    })

export default saveProduct
