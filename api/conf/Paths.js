require('dotenv').config()

module.exports = {
    extern: {
        amiralPath: `${process.env.AMIRAL_URL}/code`
    }
}
