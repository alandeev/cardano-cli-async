import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

const execAsync = async (command: string): Promise<any> =>
  new Promise((resolve, reject) => {
    return execPromise(command)
      .then(({ stdout, stderr }) => {
        if (stderr) {
          throw new Error(stderr)
        }

        return resolve(stdout)
      })
      .catch((error) => reject(error))
  })

export default execAsync
