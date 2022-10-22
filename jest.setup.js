import 'whatwg-fetch'
import 'setimmediate'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.test.local' })

jest.mock('./src/helpers/getEnvironments.js', () => ({
  getEnvironments: () => ({ ...process.env })
}))
