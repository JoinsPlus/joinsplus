export default class API {
    constructor(store) {
        this.store = store
    }
    getAPIKey() {
        console.log(this.store)
        return this.store
    }
}
