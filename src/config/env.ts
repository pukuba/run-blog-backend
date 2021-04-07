const config = {
    DB_HOST: process.env.DB_HOST || "mongodb://localhost:27017/test",
    PORT: process.env.PORT || 3000,
    JWT_PW: process.env.JWT_PW || "apple/banana",
    AUTH_PW: process.env.AUTH_PW || "banana/apple",
    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    MEMCACHED_HOST: process.env.MEMCACHED_HOST || "127.0.0.1:11211"
}

export default config