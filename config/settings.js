module.exports = {
    password_strength: 2,
    token_secret: process.env.SESSION_SECRET || 'Oh, my, God Becky, look at her butt',
    token_expiration_time: '1d'
}