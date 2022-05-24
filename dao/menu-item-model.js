const MenuType = Object.freeze({
    SANDWICH:   'sandwich',
    BEVERAGE:   'beverage',
    BREAKFAST:  'breakfast',
    PIZZA:      'pizza',
    SALAD:      'salad',
    PASTRY:     'pastry',
})

class MenuItemModel {

    constructor(options) {
        this.numeral = options.numeral
        this.name = options.name
        this.menutype = options.menutype
        this.description = options.description
        this.smallPrice = options.smallPrice
        this.price = options.price
    }
}

export {MenuItemModel, MenuType}