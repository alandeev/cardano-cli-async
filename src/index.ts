import { exec } from 'child_process'
import { promisify } from 'util'

const commandAsync = promisify(exec)

export default commandAsync
