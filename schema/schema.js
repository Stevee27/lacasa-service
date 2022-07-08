import graphql from 'graphql';

import StoreHours from '../models/storehours.js';
import MenuItem from '../models/menu-item.js';
import Option from '../models/option.js';

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
} = graphql;

const StoreHoursType = new GraphQLObjectType({
    name: 'StoreHours',
    fields: () => ({
        order: { type: GraphQLInt },
        dayOfWeek: { type: GraphQLString },
        from: { type: GraphQLString },
        to: { type: GraphQLString },
    })
})

const MenuItemType = new GraphQLObjectType({
    name: 'MenuItem',
    fields: () => ({
        sortOrder: { type: GraphQLInt },
        name: { type: GraphQLString },
        menutype: { type: GraphQLString },
        description: { type: GraphQLString },
        smallPrice: { type: GraphQLString },
        price: { type: GraphQLString },
    })
})

const OptionType = new GraphQLObjectType({
    name: 'Option',
    fields: () => ({
        sortOrder: { type: GraphQLInt },
        name: { type: GraphQLString },
        menutype: { type: GraphQLString },
        price: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        storehours: {
            type: new GraphQLList(StoreHoursType),
            resolve(parent, args) {
                return StoreHours.find();
            }
        },
        menuitems: {
            type: new GraphQLList(MenuItemType),
            resolve(parent, args) {
                return MenuItem.find();
            }
        },
        options: {
            type: new GraphQLList(OptionType),
            resolve(parent, args) {
                return Option.find();
            }
        },
    }
})

export default new GraphQLSchema({
    query: RootQuery
})
