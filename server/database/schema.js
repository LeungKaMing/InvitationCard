const mongoose = require('./connect')
const Schema = mongoose.Schema

// 用户基本信息库
const activityInfoSchema = new Schema({
    activityId: {type: String},   // 用户Id
    activityName: {type: String},   // 用户名
    activityData: {type: String},   // 活动数据
    createUser: {type: String},   // 创建人
    createDate: {type: String},   // 创建时间
    modifyDate: {type: String},   // 修改时间
    modifyUser: {type: String},   // 修改人
    onlineTime: {type: String},   // 上线时间
    offlineTime: {type: String},   // 下线时间
    dataSource: {type: Object}  // 数据源
})


// 导出一个名为User的model
// module.exports = mongoose.model('User', userInfoSchema)
module.exports = {
    activityInfoSchema
}