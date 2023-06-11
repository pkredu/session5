const graphql= require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
}  = graphql;    
   
const userType = new GraphQLObjectType({
    name:'user',
    fields:{
        id:{type:GraphQLString},
        firstName:{type:GraphQLString},
        age:{type:GraphQLInt}
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:userType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){
                return axios.get(`http://localhost:8900/users/${args.id}`)
                .then(result => result.data)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addNewUser:{
            type:userType,
            args:{
                firstName:{type: GraphQLString},
                age:{type: GraphQLInt},
            },
            resolve(parentValue,{firstName,age}){
                return axios.post(`http://localhost:8900/users/`,{firstName,age})
                .then(result => result.data)
            } 
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation : mutation
})