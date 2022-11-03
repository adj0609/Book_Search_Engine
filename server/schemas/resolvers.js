const { User } = require('../models');
const { AuthenticationError } = require('appolo-server-express');
const {signToken } = require('../utils/auth');

const resolvers = {
    Query: { 
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOn({ _id: context.user._id })
                .select('-__v -password');

                return userData;
            }
            throw new AuthenticationError('Failed to log in');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user };
        },
        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('email/password incorrect');
            }
            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('email/password incorrect');
            }
            const token = signToken(user);
            return {token, user};
        }
    }
}