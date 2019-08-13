const mongoose = require('mongoose')
// 引入库结构
const ActivityInfoSchema = require('./schema').activityInfoSchema
// 创建模型
const ActivityInfoModel = mongoose.model('Activity', ActivityInfoSchema)
const nanoid = require('nanoid')

function switchModel (schema) {
	let model
    switch (schema) {
			case 'activity':
				model = ActivityInfoModel
				break
		}
		return model
}

const utils = {
	/**
	 * 插入
	 */
	insertData: (info, schema) => {
		if (info) {
			return new Promise((resolve, reject) => {
				switchModel(schema)(info).save((err, res) => {
					if (err) {
						console.log(`插入数据错误:${err}`)
						reject('fail')
					} else {
						console.log(`插入数据成功:${res}`)
						resolve('done')
					}
				})
			})
		}
	},
	/**
	 * 查询所有数据
	 */
	find: (info, schema) => {
		return new Promise((resolve, reject) => {
			switchModel(schema).find(info, (err, res) => {
				if (err) {
					console.log(`服务器出错:${err}`)
					reject('fail')
				} else {
					if (!res) {
						console.log('没有数据')
						resolve(res)
					} else {
						console.log(`查询数据成功:${res}`)
						resolve(res)
					}
				}
			})
		})
	},
	
	/**
	 * 删除
	 *　Model.findByIdAndRemove(id, [options], [callback])　　　　　　
	 *　Model.findOneAndRemove(conditions, [options], [callback])
	 */
	del: (info, schema) => {
		return new Promise((resolve, reject) => {
			switchModel(schema).remove(info, (err, res) => {
				if (err) {
					console.log(`服务器出错${err}`)
					reject('fail')
				} else {
					console.log(`已删除${res}`)
					resolve('done')
				}
			})
		})
	},

	/**
	 * 更新
	 */
	findByIdAndUpdate: (info, schema) => {
		return new Promise((resolve, reject) => {
			console.log(info.activityId, '<<<<<save trigger')
			utils.find({
				activityId: info.activityId
			}, schema)
			.then((res) => {
				if (res.length) {
					switchModel(schema).findOneAndUpdate({activityId: info.activityId} , {dataSource: info.dataSource}, (err, res) => {
						if (err) {
							reject('更新数据失败')
						} else {
							resolve('更新数据成功')
						}
					})
				} else {
					utils.insertData(info, schema)
					.then((res) => {
						resolve('插入成功')
					})
					.catch((err) => {
						reject(err)
					})
				}
			})
		})
	}
}
module.exports = utils
