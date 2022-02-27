const CryptoJS = require("crypto-js")
const Booking = require('./model/Booking')
const Listing = require('./model/Listing')
const User = require('./model/User')

exports.resolvers = {
    Query: {
        login: async (parent, args) => {
            let user = await User.findOne({username: args.username})
            if (!user) {
                throw new Error("Wrong credentials")
            }

            // const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)

            // const originalPassword = hashedPass.toString(CryptoJS.enc.Utf8)
            
            if(user.password == args.password){
                if (user.type == 'admin') {
                    return { role: process.env.ADMIN_ROLE }
                } else {
                    return { role: process.env.USER_ROLE }
                }
            }else {
                throw new Error("Wrong credentials")
            } 
        },
        getBookings: async (parent, args) => {
            let bookings = []
            let user = await User.findOne({username: args.username})
            if (args.username) {
                if (user.type == process.env.USER_ROLE) {
                    bookings = await Booking.find({username: args.username})
                } else {
                    throw new Error("Login Required")
                }
            } else {
                if (args.role == process.env.ADMIN_ROLE) {
                    bookings = await Booking.find({})
                } else {
                    throw new Error("Login Required")
                }
            }
            return bookings
        },
        getListings: async (parent, args) => {
            let user = await User.findOne({username: args.username})
            if (user.type == process.env.ADMIN_ROLE) {
                return await Listing.find({})
            } else {
                throw new Error("You are not allow to get listings")
            }
        },
        searchListingByName: async (parent, args) => {
            return await Listing.find(args)
        },
        searchListingByCity: async (parent, args) => {
            return await Listing.find(args)
        },
        searchListingByPostalCode: async (parent, args) => {
            return await Listing.find(args)
        },

    },

    Mutation: {
        register: async (parent, args) => {
            const newUser = new User({
                username: args.username,
                password: args.password,
                email: args.email,
                firstname: args.firstname,
                lastname: args.lastname,
                type: args.type
            })
            return newUser.save()
        },
        addListing: async (parent, args) => {
            let user = await User.findOne({username: args.username})
            if (user.type == process.env.ADMIN_ROLE) {
                let listing = new Listing(args)
                return listing.save()
            }
            throw new Error("You need to be admin to do this action.")
        },
        addBooking: async (parent, args) => {
            let user = await User.findOne({username: args.username})
            if (user.type == process.env.USER_ROLE || user.type == process.env.ADMIN_ROLE) {
                let booking = new Booking(args)
                return booking.save()
            }
            throw new Error("You need to login to do this action.")
        }
    }
}