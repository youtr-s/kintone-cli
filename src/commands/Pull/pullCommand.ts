import { CommanderStatic } from 'commander'
import chalk from 'chalk'
import validator from './validator'
import { readFileSync } from 'jsonfile'
import { pullCustomization } from './pullGenerator'

const pullCommand = (program: CommanderStatic) => {
    program
        .command('pull-js')
        .option('--app-name <appName>', 'App name')
        .action(async (cmd) => {
            let error = validator.pullCustomizeValidator(cmd)
            if (error && typeof error === 'string') {
                console.log(chalk.red(error))
                return
            }
            try {
                let config = readFileSync(`${cmd['appName']}/config.json`)
                let auth = readFileSync(`${cmd['appName']}/auth.json`)
                if (config.type === 'Plugin') {
                    console.log('This command is not for Plugin.')
                    return
                }
                pullCustomization(config, auth)
            } catch (error) {
                console.log(error)
            }
        })
}

export default pullCommand
