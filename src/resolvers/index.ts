import Query from "resolvers/Query"
import Type from "resolvers/Type"
import Mutation from "resolvers/Mutation"

export default {
    Query,
    ...Type,
    Mutation
}