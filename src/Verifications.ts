/**
 * 基础校验规则
 */
export class Verifications {
  /**
   * 必填校验
   * @param [msg='请输入']
   */
  static required(msg = '请输入') {
    return {
      execute: async (value) => !!value,
      msg
    } as IVerificationItem<string>
  }
  /**
   * 字符最大限制
   * @param num 最大数量
   * @param msg 输入位数不能大于${num}
   * @returns
   */
  static maxLenth(num: number, msg = '') {
    const defaultMsg = `输入位数不能大于${num}`
    return {
      execute: async (value) => value?.length <= num,
      msg: msg ?? defaultMsg
    } as IVerificationItem<string>
  }
  /**
   * 字符最小限制
   * @param num 最小数量
   * @param msg 输入位数不能小于${num}
   * @returns
   */
  static minLenth(num: number, msg = '') {
    const defaultMsg = `输入位数不能小于${num}`
    return {
      execute: async (value) => value?.length >= num,
      msg: msg ?? defaultMsg
    } as IVerificationItem<string>
  }
  /**
   * 数量最小值
   * @param num 最小数
   * @param msg 输入不能小于${num}
   * @returns
   */
  static min(num: number, msg = '') {
    const defaultMsg = `输入不能小于${num}`
    return {
      execute: async (value) => Number(value) >= num,
      msg: msg ?? defaultMsg
    } as IVerificationItem<string>
  }
  /**
   * 数量最小值
   * @param num 最大数
   * @param msg 输入不能大于${num}
   * @returns
   */
  static max(num: number, msg = '') {
    const defaultMsg = `输入不能大于${num}`
    return {
      execute: async (value) => Number(value) <= num,
      msg: msg ?? defaultMsg
    } as IVerificationItem<string>
  }

  /**
   * 手机号码正则表达式（以中国大陆手机号码为例，11位数字，以1开头）
   * @param [msg='手机号码格式有误']
   */
  static mobile(msg = '手机号码格式有误') {
    return {
      regex: new RegExp('^1[3-9]\\d{9}$'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 电子邮件地址正则表达式（简单版，仅匹配基本的电子邮件格式）
   * @param [msg='电子邮件地址格式有误']
   */
  static email(msg = '电子邮件地址格式有误') {
    return {
      regex: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * URL地址正则表达式
   * @param [msg='URL地址格式有误']
   */
  static url(msg = 'URL地址格式有误') {
    return {
      regex: new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 用户名正则表达式（字母、数字、下划线，4-16位）
   * @param props.min =6
   * @param props.max =16
   * @param props.msg = 请输入字母、数字、下划线，${min}-${max}位
   */
  static username({ min = 6, max = 16, msg = '' } = {}) {
    const defaultMsg = `请输入字母、数字、下划线，${min}-${max}位`
    return {
      regex: new RegExp(`^[a-zA-Z0-9_]{${min},${max}}$`),
      msg: msg ?? defaultMsg
    } as IVerificationItem<string>
  }

  /**
   * 密码正则表达式（字母、数字、特殊字符，6-18位）
   * @param props.min =6
   * @param props.max =16
   * @param props.msg = 请输入字母、数字、特殊字符，${min}-${max}位
   */
  static password({ min = 6, max = 16, msg = '' } = {}) {
    const defaultMsg = `请输入字母、数字、特殊字符，${min}-${max}位`
    return {
      regex: new RegExp(`^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{${min},${max}}$`),
      msg: msg ?? defaultMsg
    } as IVerificationItem<string>
  }

  /**
   * 整数正则表达式（正整数和负整数）
   * @param [msg='整数格式有误']
   */
  static integer(msg = '整数格式有误') {
    return {
      regex: new RegExp('^-?\\d+$'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 浮点数正则表达式（正浮点数和负浮点数）
   * @param [msg='浮点数格式有误']
   */
  static float(msg = '浮点数格式有误') {
    return {
      regex: new RegExp('^-?\\d+(\\.\\d+)?$'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 中文字符正则表达式
   * @param [msg='必须包含中文字符']
   */
  static chinese(msg = '必须包含中文字符') {
    return {
      regex: new RegExp('[\\u4e00-\\u9fa5]'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * IP地址（IPv4）正则表达式
   * @param [msg='IP地址格式有误']
   */
  static ip(msg = 'IP地址格式有误') {
    return {
      regex: new RegExp(
        '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
      ),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 十六进制颜色正则表达式
   * @param [msg='十六进制颜色格式有误']
   */
  static hexColor(msg = '十六进制颜色格式有误') {
    return {
      regex: new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 日期（YYYY-MM-DD格式）正则表达式
   */
  static date({ msg = '日期格式有误', dash = '-' } = {}) {
    return {
      regex: new RegExp(`^\\d{4}${dash}\\d{2}${dash}\\d{2}$`),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 时间（HH:mm:ss格式）正则表达式
   */
  static time({ msg = '时间格式有误', dash = ':' } = {}) {
    return {
      regex: new RegExp(`^([01]\\d|2[0-3])${dash}([0-5]\\d)${dash}([0-5]\\d)$`),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 身份证号码（简单版，15位或18位）正则表达式
   * @param [msg='身份证号码格式有误']
   */
  static idCard(msg = '身份证号码格式有误') {
    return {
      regex: new RegExp('(^[0-9]{15}$)|(^[0-9]{17}([0-9]|X|x)$)'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 邮政编码（6位数字）正则表达式
   * @param [msg='邮政编码格式有误']
   */
  static postalCode(msg = '邮政编码格式有误') {
    return {
      regex: new RegExp('^\\d{6}$'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 电话号码（简单版，区号+号码，区号以0开头，3-4位数字；号码7-8位数字）正则表达式
   * @param [msg='电话号码格式有误']
   */
  static phone(msg = '电话号码格式有误') {
    return {
      regex: new RegExp('^0\\d{2,3}-\\d{7,8}$'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 微信号（简单版，6-20位，包括字母、数字、下划线和减号）正则表达式
   * @param [msg='微信号格式有误']
   */
  static wechat(msg = '微信号格式有误') {
    return {
      regex: new RegExp('^[a-zA-Z0-9_-]{6,20}$'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * QQ号码（5-12位数字）正则表达式
   * @param [msg='QQ号码格式有误']
   */
  static qq(msg = 'QQ号码格式有误') {
    return {
      regex: new RegExp('^[1-9]\\d{4,11}$'),
      msg
    } as IVerificationItem<string>
  }

  /**
   * 车牌号（简单版，以省份简称开头，后面是一个字母和5个字母或数字）正则表达式
   * @param [msg='车牌号格式有误']
   */
  static plateNumber(msg = '车牌号格式有误') {
    return {
      regex: new RegExp(
        '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{5}$'
      ),
      msg
    } as IVerificationItem<string>
  }
}

/**
 * 验证规则: 如果同时设置了execute和regex，两者都通过才算验证通过
 */
type IVerificationItem<V> = {
  /**
   * 正则表达式
   */
  regex?: RegExp
  /**
   * 自定义校验函数：异步
   * @param value 要验证的值
   * @returns 是否通过验证：true为通过，false为不通过
   */
  execute?: (value: V) => Promise<boolean>
  msg: string
}
