import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';
import mongoose from 'mongoose';

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
    Query:{
        users: async () => await User.find({}),
        user: async (_, { _id }) => await User.findOne({_id}),
        quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
        iquote: async (_, { by }) => await Quote.find({by}),
        myprofile: async (_, args, { userId }) => {
            if(!userId) throw new Error("You must be logged in")
            return await User.findOne({_id: userId})
        }
    },
    User:{
        quotes: async (user) => await Quote.find({by: user._id})
    },
    Mutation:{
        signupUser: async (_, { userNew }) => {
            const user = await User.findOne({ email: userNew.email })
            if(user){
                throw new Error("User already exist with that email")
            }
            const hashedPassword = await bcrypt.hash(userNew.password, 12)
            const newUser = new User({
                ...userNew,
                password: hashedPassword
            })
            return await newUser.save()
        },
        signinUser: async (_, { userSignin }) => {
            const user = await User.findOne({ email: userSignin.email })
            if(!user){
                throw new Error("Email or Password is invalid")
            }
            const matchPassword = await bcrypt.compare(userSignin.password, user.password)
            if(!matchPassword){
                throw new Error("Email or Password is invalid")
            }
            const token = jwt.sign({userId: user._id}, JWT_SECRET)
            return {token}
        },
        createQuote: async (_, { name }, { userId }) => {
            if(!userId){
                throw new Error("You must be logged in")  
            } 
            const newQuote = new Quote({
                name,
                by: userId
            })
            await newQuote.save()
            return "Quote saved successfully!"
        },
        updateUser: async (_, args, { userId }) => {
            if(!userId){
                throw new Error("You must be logged in")  
            }
            await User.updateOne(
                { _id: args._id },
                { $set: { ...args } }
            );
            return "User updated!!"
        },
        deleteUser: async (_, { _id }, { userId }) => {
            if(!userId){
                throw new Error("You must be logged in")  
            }
            await User.remove({ _id: _id })
            return "User deleted!"
        },
        updateQuote: async (_, { name }, { userId }) => {
            if(!userId){
                throw new Error("You must be logged in")  
            }
            await Quote.updateOne(
                { by: userId },
                { $set: { name: name } }
            );
            return "Quote updated!!"
        },
        deleteQuote: async (_, { name }, { userId }) => {
            if(!userId){
                throw new Error("You must be logged in")  
            }
            await Quote.remove({ by:userId, name: name })
            return "Quote deleted!!"
        }
    }
}

export default resolvers;