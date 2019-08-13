const queryString = require('query-string')

export function getToken () {
}

/**
 * 将url的参数转换成对象格式
 * @returns {Object} 返回经过对象格式化的query
 */
export function getQueryString () {
   return queryString.parse(window.location.search)
}

/**
 * 检查字符参数是否在字符串里
 * @param {string} s 传入的字符参数
 * @param {string} str 完整字符串
 * @param {string} method 判断是检查开头 / 结尾 / 包含 关系
 * @param {string} pos 开始搜索的位置
 * @example statusAboutStr('startsWith', 's', 'string')
 * @example statusAboutStr('endsWith', 's', 'string')
 * @example statusAboutStr('includesWith', 's', 'string')
 * @returns 布尔值
 */
export function statustAboutStr (method, s, str, pos = 0) {
    return s[method](str, pos)
}

/**
 * 对字符串进行补全
 * @description 从某个位置开始对某个字符串以某个字符进行补全，不足补到够为止
 * @description 如果省略最后一个参数，默认使用空格补全长度
 * @param {string} method 
 * @param {number} len 
 * @param {string} s 
 * @param {string} str 
 * @example padStr('padStart', 's', 'string', 4)
 * @example padStr('padEnd', 's', 'string', 4)
 * @example padStr('padStart', '09-01', 'YYYY-MM-DD', 10) => YYYY-09-01
 * @returns 补全后的字符串
 */
export function padStr (method, s, str, len = 2) {
    return s[method](len, str)
}

/**
 * 返回一个新字符串，表示将原字符串重复n次
 * @param {string} str 
 * @param {number} count 
 * @example repeat('ab', 4) => 'abababab'
 * @returns 字符串
 */
export function repeat (str, count = 0) {
    return str.repeat(count)
}

/**
 * 捕获命中正则具体位置的值
 * @description “具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?<year>），然后就可以在exec方法返回结果的groups属性上引用该组名
 * @param {RegExp} reg 
 * @param {string} str 
 * @example captureGroup(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/, '1992-09-01') => {day: "01", month: "09", year: "1992"}
 * @returns 对象
 */
export function captureGroup (reg, str) {
    return reg.exec(str).groups
}

/**
 * 将命中正则的字符串用模版格式进行替换
 * @param {RegExp} reg 
 * @param {string} str 
 * @param {string} template
 * @example changeTemplate(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u, '2019-01-22', '$<day>/$<month>/$<year>') 
 * @returns 按模板替换后的字符串
 */
export function changeTemplate (reg, str, template) {
    return str.replace(reg, template)
}

/**
 * 克隆数组
 * @description 【浅拷贝】rest参数为对象项的时候慎用，因为一改变原对象项，可能会同时影响新生成数组的对象项
 * @description 1. 将用逗号分隔的参数序列转换成数组 2. 再将这个数组拆分成参数序列，逐个push进去传入的新数组arr
 * @param {Array} arr 
 * @example mapArr([], 1, 2, 3) => [1, 2, 3] 
 * @returns 更新传入的数组
 */
export function mapArr (arr, ...args) {
    arr.push(...args)
}

/**
 * 将类数组项转换为数组
 * @description 所谓类似数组的对象，本质特征只有一点，即必须有length属性。
 * @example likeObjToArr(1, 2, 3) => [1,2,3] 
 * @example likeObjToArr(new Set([1, 2, 3])) => [1,2,3]
 * @example likeObjToArr({ length: 3 }) => [ undefined, undefined, undefined ]
 * @returns 数组
 */
export function likeObjToArr () {
    return Array.from ? Array.from(arguments) : [].slice.call(arguments)
}

/**
 * 用于将一组值，转换为数组
 * @description 
 * @example argToArr(1, 2, 3) => [1,2,3] 
 * @returns 数组
 */
export function argToArr () {
    return Array.from ? Array.of(...arguments) : [].slice.call(arguments)
}

/**
 * 用于数组内部复制后替换项
 * @param {Array} arr 操作数组
 * @param {number} target 目标位置
 * @param {number} start 起始位置
 * @param {number} end 结束位置
 * @example innerCopy([1, 2, 3, 4, 5], 0, 2) => [3, 4, 5, 4, 5] 
 * @returns 修改原有操作数组
 */
export function innerCopy (arr, target, start, end) {
    arr.copyWithin(target, start ,end)
}

/**
 * 将数组在条件函数查询是否命中
 * @description 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
 * @param {Array} arr 操作数组
 * @param {number} cb 回调函数【数组每项都要传入】
 * @param {number} cb.n 当前项
 * @param {number} cb.index 当前项的索引
 * @param {number} cb.arr 原数组
 * @example findInArr([1, 13, 5, 6], (n, index, arr) => n % 2 === 0)
 * @returns 仅返回命中后的第一个项
 */
export function findInArr (arr, cb) {
    return arr.find(cb)
}

/**
 * 使用给定值填充一个数组
 * @param {Array} arr 操作数组 
 * @param {*} item 填充值
 * @param {*} start 填充起始位置
 * @param {*} end 填充结束位置
 * @example fillInarr([1, 2, 3], 7) => [7, 7, 7]
 * @returns 修改原有操作数组
 */
export function fillInArr (arr, item, start, end) {
    return arr.fill(item, start, end)
}

/**
 * 根据传入的方法不同，遍历数组相关的项
 * @description method: entries, keys, values => 本身数组搭配这些方法是返回一个迭代器【可以用let item of arr】，这个方法再次封装，让返回的直接转换成数组
 * @param {Array} arr 操作数组
 * @param {string} method 方法
 * @example getMoreArr([1, 2, 3], ‘keys’) => [0, 1, 2]
 * @returns 返回新数组
 */
export function getMoreArr (arr, method) {
    return Array.from(arr[method]())
}

/**
 * 判断数组是否包含给定值
 * @param {*} arr 操作数组
 * @param {*} item 给定值
 * @example includeArr([1, 2, 3], 2) => true
 * @returns 返回布尔值
 */
export function includeArr (arr, item, index) {
    return arr.includes(item, index)
}

/**
 * 拉平数组
 * @description flatMap()只能展开一层数组
 * @param {Array} arr 操作数组
 * @param {*} layer 拉平的层数 => Infinity会削成只剩余一层
 * @param {Function} cb 回调函数 => 数组的每一项都执行该函数
 * @example flatArr([1, 2, [1, 2, 3]]) => [1, 2, 1, 2, 3]
 * @example flatArr([1, 2, [3, [4, 5]]], 2) => [1, 2, 1, 2, 3]
 * @example flatArr([1, 2, [3, [4, 5]]], Infinity) => [1, 2, 1, 2, 3]
 * @example flatArr([1, 2, [3, [4, 5]]], Infinity, (item) => item % 2 === 0) => 
 * @returns 返回新数组
 */
export function flatArr (arr, layer = Infinity, cb = () => {}) {
    return cb ? arr.flatMap(cb) : arr.flat(layer)
}