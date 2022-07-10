import ElegibleType from './ElegibleType'

interface Person {
    id: number
    name: string
    age: number
    elegibleType?: ElegibleType
}

export default Person
