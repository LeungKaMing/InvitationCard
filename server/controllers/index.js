// 控制层永远都是做好结构result = {success: false, message: '', data: null, code: ''}
const services = require('../services/index')

module.exports = async (params) => {
  // 操作逻辑层
  const serviceResult = await services[params.url](params)
  // 构建统一返回主体
  return {
    code: serviceResult.code,
    msg: serviceResult.msg,
    data: serviceResult.data,
  }
}