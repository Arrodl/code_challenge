module.exports = {
    HOST: "localhost",
    USER: "alfonsoreyna",
    PASSWORD: "123456",
    DB: "edgewater",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};