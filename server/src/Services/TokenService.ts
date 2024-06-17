import jwt from 'jsonwebtoken';

class TokenService {
    generateTokens(payload) {
        console.log([process.env.JWT_ACCESS_SECRET, process.env.JWT_REFRESH_SECRET])

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        
        return {
            accessToken,
            refreshToken
        }
    }
}

export default new TokenService()