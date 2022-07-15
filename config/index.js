export const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:3000' : 'http://localhost:3000'

export const ironOptions = {
    cookieName: "web3_articles_user_data",
    password: process.env.COOKIE_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}