import User from '../models'

const JwtStrategy = require('passport-jwt').Strategy
ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_JWT_SECRET
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne(jwt_payload.id)
        .then(user => {
          if (user) return done(null, user)
          return done(null, false)
        })
        .catch(err => {
          return done(err, false, { message: 'Server Error' })
        })
    })
  )
}
