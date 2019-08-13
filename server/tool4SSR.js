const path = require('path')
const fs = require('fs')

const fileList = fs.readdirSync(path.resolve(__dirname, '../dist'))
const container = []

module.exports = (params) => {
    fileList.map((file) => {
        const ext = path.extname(file).slice(1)
        if (ext === 'js') {
            const reg = new RegExp(`${params}`,"gim");
            if (reg.test(file)) {
                container.push(file)
            }
        }
    })
    return container
}