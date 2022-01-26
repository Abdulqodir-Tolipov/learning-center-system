const {Pool} = require("pg")
const pgConfig = require("../config/pg.js")

const pool = new Pool({
    port: pgConfig.PORT,
    host: pgConfig.HOST,
    user: pgConfig.USER,
    password: pgConfig.PASSWORD,
    database: pgConfig.DATABASE
})

const pgFn = async (isOneRow, query, ...args) => {
    const client = await pool.connect()
    try {
        const data = (await client.query(query, args)).rows
        return isOneRow ? data[0] : data
    } catch (error) {
        throw new Error(error.message)
    } finally {
        await client.release()
    }
}

module.exports = pgFn