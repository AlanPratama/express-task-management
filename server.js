import app from './src/app.js'
import connectionDB from './src/core/database.js'
import dotenv from 'dotenv'

dotenv.config()
connectionDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT: ${PORT}`);
})