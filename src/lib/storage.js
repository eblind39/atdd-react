export const storage = {
    save({ key, vlaue }) {
        return localStorage.setItem(key, value);
    },
    get({ key }) {
        return localStorage.getItem(key);
    }
}