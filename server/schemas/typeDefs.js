const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]

}
type Auth {
    token: ID!
    user: User
}
type Query {
    me: User
    users: [User]
    user(username: String!): User
}

type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type BookInput {
bookId: String
authors: [String]
description: String
title: String
image: String
link: String
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: String! ): Book
    removeBook(input: String! ): Book
    }   
`;

module.exports = typeDefs;