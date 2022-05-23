
class StoreHours {

    constructor(options) {
        this.numeral = options.numeral
        this.day = options.day
        this.from = options.from
        this.to = options.to
    }

    save(db) {
        const promise = new Promise((resolve, reject) => {
            db.collection('store_hours').insertOne(this)
                .then(res => {
                            resolve(this.numeral)
                        })
                .catch(err => {
                    console.log(err)
                })
        })
        return promise
    }
}

export default StoreHours