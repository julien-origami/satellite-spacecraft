import sqlite3 from 'sqlite3'
import path from 'path'

require('dotenv').config()

const connection = new sqlite3.Database(path.resolve(__dirname, process.env.DB_CON), sqlite3.OPEN_READWRITE, err => {
    if (err) {
        showError(err)
        throw new Error(err.message)
    }
    console.log('SPACECRAFT DATABASE -----------> CONNECTED')
})

const showError = err => {
    if (err) {
        console.error(`SPACECRAFT QUERY -----------> ERR: ${err.message}`)
    }
}

const Db = {
    queryAll: (text, params, then) => {
        return Db.connection.all(text, params, (err, rows) => {
            showError(err)
            then(rows)
        })
    },
    queryFirst: (text, params, then) => {
        return Db.connection.get(text, params, (err, row) => {
            showError(err)
            then(row)
        })
    },
    connection: connection
}

export default Db
