import Db from '../conf/Db'

const emptyFunc = () => {}

module.exports = {
    insertCode: (token, then = emptyFunc) => {
        return Db.queryAll('INSERT OR REPLACE INTO TOKENHISTORY (token) values ($1)', [token], then)
    },
    updateAmiralSpaceCraft: (name, then = emptyFunc) => {
        return Db.queryAll('INSERT OR REPLACE INTO AMIRALSPACECRAFT (name) values ($1)', [name], then)
    },
    getAmiralSpaceCraft: (then = emptyFunc) => {
        return Db.queryFirst('SELECT * FROM AMIRALSPACECRAFT', [], then)
    },
    deleteOldTokens: (date, then = emptyFunc) => {
        return Db.queryAll('DELETE FROM TOKENHISTORY WHERE date < $1', [date], then)
    },
    getTokens: (then = emptyFunc) => {
        return Db.queryAll('SELECT * FROM TOKENHISTORY ORDER BY date DESC', [], then)
    },
    deleteSpaceCraft: (then = emptyFunc) => {
        return Db.queryAll('DELETE FROM AMIRALSPACECRAFT', [], then)
    }
}
