module.exports = {
    HOST: "localhost",
    USER: "alfonsoreyna",
    PASSWORD: "123456",
    DB: process.env.DATABASE_URL || "edgewater",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};