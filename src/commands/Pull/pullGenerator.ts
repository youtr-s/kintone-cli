import { writeFileSync } from 'fs'
import { writeFileSync as writeFileSyncJson } from 'jsonfile'
import { KintoneRestAPIClient } from '@kintone/rest-api-client'

const pullCustomization = async (config: any, auth: any) => {
    const client = new KintoneRestAPIClient({
        baseUrl: 'https://' + auth.domain,
        auth: {
            username: auth.username,
            password: auth.password,
        },
    })
    const fileList = await client.app.getAppCustomize({ app: config.appID })
    fileList.desktop.js.forEach(async (resourceInfo, index) => {
        if (resourceInfo.type === 'URL') {
            config.uploadConfig.desktop.js[index] = resourceInfo.url
        } else {
            config.uploadConfig.desktop.js[
                index
            ] = `${config.appName}/source/js/${resourceInfo.file.name}`
            var file = await client.file.downloadFile({
                fileKey: resourceInfo.file.fileKey,
            })
            writeFileSync(`${config.appName}/source/js/${resourceInfo.file.name}`, file)
        }
    })
    fileList.desktop.css.forEach(async (resourceInfo, index) => {
        if (resourceInfo.type === 'URL') {
            config.uploadConfig.desktop.css[index] = resourceInfo.url
        } else {
            config.uploadConfig.desktop.css[
                index
            ] = `${config.appName}/source/css/${resourceInfo.file.name}`
            var file = await client.file.downloadFile({
                fileKey: resourceInfo.file.fileKey,
            })
            writeFileSync(`${config.appName}/source/css/${resourceInfo.file.name}`, file)
        }
    })
    writeFileSyncJson(`${config.appName}/config.json`, config, { spaces: 4, EOL: '\r\n' })
}

export { pullCustomization }
