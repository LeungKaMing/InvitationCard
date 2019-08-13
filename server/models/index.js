// 模型层需要处理跟数据库交互的SQL语句
// 所有sql语句都要封装起来
const dbUtils = require('../database/index.js')
const resultObj = {

    getActivityList: async (params) => {
        return await dbUtils.find(params, 'activity')
    },
    getDraftList: async (params) => {
        return await dbUtils.find(params, 'activity')
    },
    saveActivity: async (params) => {
        return await dbUtils.findByIdAndUpdate(params, 'activity')
    },
    publishActivity: async (params) => {
        // 调用发布接口应该也要找到当前活动id的项，然后更新一遍
        return await dbUtils.findByIdAndUpdate(params, 'activity')
    }
}

module.exports = resultObj