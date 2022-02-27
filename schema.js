const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    scalar Date
    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        password: String!
        email: String!
        type: String!
    }
    type Listing {
        id: ID!
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        username: String!
    }
    type Booking {
        id: ID!
        listing_id: String!
        booking_id: String!
        booking_date: Date!
        booking_start: Date!
        booking_end: Date!
        username: String!
    }
    type Auth {
        role: String
    }
    type Query {
        login(username: String!, password: String!) : Auth
        getBookings(username: String) : [Booking]
        getListings(username: String!) : [Listing]
        searchListingByName(name: String!) : [Listing]
        searchListingByCity(city: String!) : [Listing]
        searchListingByPostalCode(postalCode: String!) : [Listing]
    }
    type Mutation {
        register(
            username: String!
            firstname: String!
            lastname: String!
            password: String!
            email: String!
            type: String!
        ) : User
        
        
        addListing(
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            price: Float!
            email: String!
            username: String!
            postal_code: String!
        ) : Listing
        
        
        addBooking(
            listing_id: String!
            booking_id: String!
            booking_end: Date!
            username: String!
            booking_start: Date!
        ) : Booking
        }
`