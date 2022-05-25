
class OptionModel {

    constructor(options) {
        this.name = options.name
        this.menuType = options.menuType,
        this.sortOrder = options.sortOrder,
        this.price = options.price != null ? options.price : 0.0
    }
}

export default OptionModel