/**
 * 基础校验规则
 */
export class Verifications {
  /**
   * 必填校验
   */
  static required: IVerificationItem<string> = {
    execute: async (value) => !!value,
    msg: '请输入'
  }

  /**
   * 手机号码正则表达式（以中国大陆手机号码为例，11位数字，以1开头）
   * @type {IVerificationItem<string>}
   */
  static mobile: IVerificationItem<string> = {
    regex: /^1[3-9]\d{9}$/,
    msg: '手机号码格式有误'
  }

  /**
   * 电子邮件地址正则表达式（简单版，仅匹配基本的电子邮件格式）
   * @type {IVerificationItem<string>}
   */
  static email: IVerificationItem<string> = {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    msg: '电子邮件地址格式有误'
  }

  /**
   * URL地址正则表达式
   * @type {IVerificationItem<string>}
   */
  static url: IVerificationItem<string> = {
    regex: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    msg: 'URL地址格式有误'
  }

  /**
   * 用户名正则表达式（字母、数字、下划线，4-16位）
   * @type {IVerificationItem<string>}
   */
  static username: IVerificationItem<string> = {
    regex: /^[a-zA-Z0-9_]{4,16}$/,
    msg: '用户名格式有误'
  }

  /**
   * 密码正则表达式（字母、数字、特殊字符，6-18位）
   * @type {IVerificationItem<string>}
   */
  static password: IVerificationItem<string> = {
    regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,18}$/,
    msg: '密码格式有误'
  }

  /**
   * 整数正则表达式（正整数和负整数）
   * @type {IVerificationItem<string>}
   */
  static integer: IVerificationItem<string> = {
    regex: /^-?\d+$/,
    msg: '整数格式有误'
  }

  /**
   * 浮点数正则表达式（正浮点数和负浮点数）
   * @type {IVerificationItem<string>}
   */
  static float: IVerificationItem<string> = {
    regex: /^-?\d+(\.\d+)?$/,
    msg: '浮点数格式有误'
  }

  /**
   * 中文字符正则表达式
   * @type {IVerificationItem<string>}
   */
  static chinese: IVerificationItem<string> = {
    regex: /[\u4e00-\u9fa5]/,
    msg: '必须包含中文字符'
  }

  /**
   * IP地址（IPv4）正则表达式
   * @type {IVerificationItem<string>}
   */
  static ip: IVerificationItem<string> = {
    regex:
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    msg: 'IP地址格式有误'
  }

  /**
   * 十六进制颜色正则表达式
   * @type {IVerificationItem<string>}
   */
  static hexColor: IVerificationItem<string> = {
    regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    msg: '十六进制颜色格式有误'
  }

  /**
   * 日期（YYYY-MM-DD格式）正则表达式
   * @type {IVerificationItem<string>}
   */
  static date: IVerificationItem<string> = {
    regex: /^\d{4}-\d{2}-\d{2}$/,
    msg: '日期格式有误'
  }

  /**
   * 时间（HH:mm:ss格式）正则表达式
   * @type {IVerificationItem<string>}
   */
  static time: IVerificationItem<string> = {
    regex: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
    msg: '时间格式有误'
  }

  /**
   * 身份证号码（简单版，15位或18位）正则表达式
   * @type {IVerificationItem<string>}
   */
  static idCard: IVerificationItem<string> = {
    regex: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
    msg: '身份证号码格式有误'
  }

  /**
   * 邮政编码（6位数字）正则表达式
   * @type {IVerificationItem<string>}
   */
  static postalCode: IVerificationItem<string> = {
    regex: /^\d{6}$/,
    msg: '邮政编码格式有误'
  }

  /**
   * 电话号码（简单版，区号+号码，区号以0开头，3-4位数字；号码7-8位数字）正则表达式
   * @type {IVerificationItem<string>}
   */
  static phone: IVerificationItem<string> = {
    regex: /^0\d{2,3}-\d{7,8}$/,
    msg: '电话号码格式有误'
  }

  /**
   * 微信号（简单版，6-20位，包括字母、数字、下划线和减号）正则表达式
   * @type {IVerificationItem<string>}
   */
  static wechat: IVerificationItem<string> = {
    regex: /^[a-zA-Z0-9_-]{6,20}$/,
    msg: '微信号格式有误'
  }

  /**
   * QQ号码（5-12位数字）正则表达式
   * @type {IVerificationItem<string>}
   */
  static qq: IVerificationItem<string> = {
    regex: /^[1-9]\d{4,11}$/,
    msg: 'QQ号码格式有误'
  }

  /**
   * 车牌号（简单版，以省份简称开头，后面是一个字母和5个字母或数字）正则表达式
   * @type {IVerificationItem<string>}
   */
  static plateNumber: IVerificationItem<string> = {
    regex: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{5}$/,
    msg: '车牌号格式有误'
  }
}

/**
 * 验证规则
 *
 */
type IVerificationItem<V> = Partial<{
  /**
   * 正则
   * @description 同时设置了execute和regex的情况下,需要两个都验证通过才算通过
   **/
  regex: RegExp
  /**
   * 自定义表达式: 异步
   * @description 同时设置了execute和regex的情况下,需要两个都验证通过才算通过
   * @param value
   * @returns 是否正确: true:正确, false:错误
   */
  execute: (value: V) => Promise<boolean>
  msg: React.ReactNode
}>
