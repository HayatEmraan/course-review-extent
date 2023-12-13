import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

async function main() {
  try {
    await mongoose.connect(config.db_url as string)
    await app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`)
    })
  } catch (error) {
    console.log('Error: ', error)
  }
}

main()