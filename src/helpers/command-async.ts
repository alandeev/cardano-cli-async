import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

const execAsync = async (command: string): Promise<any> =>
  new Promise(async (resolve, reject) => {
    const { stdout, stderr } = await execPromise(command)
    if (stderr) {
      return reject(stderr)
    }

    return resolve(stdout)
  })

export default execAsync
