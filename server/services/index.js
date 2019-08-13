/**
 * 用户业务操作
 * 逻辑层主要对从控制层传入的类似FormData的大型数据进行筛选，把精简后的数据传去模型层做处理。
 */
const models = require('../models/index')

const resultObj = {
    getActivityList: async (params) => {
        const modelResult = await models[params.url](params.data)
        return {
            code: 200,
            data: modelResult,
            msg: params.msg
        }
    },
    getDraftList: async (params) => {
        const modelResult = await models[params.url](params.data)
        return {
            code: 200,
            data: modelResult,
            msg: params.msg
        }
    },
    saveActivity: async (params) => {
        const modelResult = await models[params.url](params.data)
        return {
            code: 200,
            data: modelResult,
            msg: params.msg
        }
    },
    publishActivity: async (params) => {
        const modelResult = await models[params.url](params.data)
        return {
            code: 200,
            data: modelResult,
            msg: params.msg
        }
    },
}
module.exports = resultObj