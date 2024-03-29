import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { IVerificationItem } from './Verifications'
import { IObjectData, useObjectData, useObjectState } from './useObjectData'

/**
 * 关于TS泛型的思考,
 * 1. 一定要知道泛型来自于哪里,参数取决于哪里是最重要的问题
 * 2. 一定要区分集合和单个元素
 */

// /**
//  * 验证规则
//  */
// export type IVerificationItem<V> = Partial<{
//   /**
//    * @description 正则 同时设置了execute和regex的情况下,需要两个都验证通过才算通过
//    **/
//   regex: RegExp
//   /**
//    * 自定义表达式: 异步
//    * @description 同时设置了execute和regex的情况下,需要两个都验证通过才算通过
//    * @param value
//    * @returns 是否正确: true:正确, false:错误
//    */
//   execute: (value: V) => Promise<boolean>
//   /**
//    * 错误提示
//    */
//   msg: React.ReactNode
// }>

/**
 * 获取一个Promise 外置了reslove，reject
 * @returns
 */
export const getPromise = <T>() => {
  let reslove: (value: T) => void, reject: (err: any) => void
  let promise = new Promise<T>((r, j) => {
    reslove = r
    reject = j
  })
  return {
    promise,
    // @ts-ignore
    reslove,
    // @ts-ignore
    reject
  }
}

/**
 * 错误
 */
export type IError = {
  /**
   * 是否错误
   */
  isInvalid: boolean
  /**
   * 错误提示(存在多个时取第一个)
   */
  msg: React.ReactNode
  /**
   * 当前字段的所有的错误
   */
  errors: IVerificationItem<any>[]
}
// keyof T, IError
/**
 * 错误集合
 */
export type IErrors<T> = Partial<Record<keyof T, IError>>

/**
 * 单值验证规则数组
 */
export type IVerification<V> = Array<IVerificationItem<V>>
/**
 * 表单验证规则集合
 */
export type IVerifications<T, K extends keyof T = keyof T> = Partial<{
  [P in K]: IVerification<T[P]>
}>

export type IValidateKey<T> = {
  /**
   * 验证属性
   */
  key: keyof T
  /**
   * 时间戳
   */
  time: number
}

/**
 * 表单验证基础方法
 */
const useFormDataBase = <T extends Record<string, any> = Record<string, any>>(
  value: T,
  setValue: Dispatch<SetStateAction<T>>,
  verifications: IVerifications<T> = {}
) => {
  const formData = useObjectState(value, setValue)
  const formErrors = useObjectData<IErrors<T>>({})

  // ----以下用于解决onChange时立即调用获取最新值的问题
  const [validateKey, setValidateKey] = useState<IValidateKey<T>>({ key: '', time: 0 })

  const validateRes = useRef(getPromise<{ isTrue: boolean; errors: IVerificationItem<any>[] }>())
  /**
   * 解决React赋值后马上验证获取不到最新数据的异常
   * @param key
   */
  const doValidateImme = <K extends keyof T>(key: K) => {
    validateRes.current = getPromise()
    setValidateKey({ key, time: new Date().getTime() })
    return validateRes.current.promise
  }

  useEffect(() => {
    if (validateKey.time == 0) {
      return
    }
    doValidate(validateKey.key).then((res) => validateRes.current.reslove(res))
  }, [validateKey])

  // ---以下代码为了解决在赋值后doAllValidate无法直接获取到最新数据
  // 用于触发doAllValidate回调
  const [allValidateKey, setAllValidateKey] = useState(0)
  /**
   * 存储doAllValidate的验证结果
   */
  const allValidRes = useRef(
    getPromise<{
      isValid: boolean
      data: T
    }>()
  )
  /**
   * 解决React赋值后马上验证获取不到最新数据的异常
   * @returns
   */
  const doAllValidateImme = () => {
    setAllValidateKey(new Date().getTime())
    allValidRes.current = getPromise()
    return allValidRes.current.promise
  }

  useEffect(() => {
    if (allValidateKey == 0) {
      return
    }
    doAllValidate().then((res) => {
      allValidRes.current.reslove({ isValid: res, data: value })
    })
  }, [allValidateKey])

  const doValidate = async <K extends keyof T>(key: K) => {
    const verifItems = verifications[key]
    if (verifItems) {
      const verifStates = await Promise.all(
        verifItems.map(async (item) => {
          let isT1 = true
          if (item.execute) {
            isT1 = await item.execute?.(formData.value[key], formData.value)
          }
          let isT2 = true
          if (item.regex) {
            isT2 = item.regex.test(formData.value[key])
          }
          return {
            isTrue: isT1 && isT2,
            varifItem: item
          }
        })
      )
      const errors = verifStates.filter((item) => !item.isTrue).map((it) => it.varifItem)

      const isTrue = errors?.length == 0

      if (!isTrue) {
        formErrors.pushValue(key, {
          isInvalid: true,
          msg: errors[0]?.msg,
          errors
        })
      } else {
        formErrors.pushValue(key, {
          isInvalid: false,
          msg: '',
          errors: []
        })
      }

      return {
        isTrue,
        errors
      }
    }
    return {
      isTrue: true,
      errors: []
    }
  }

  const doAllValidate = async () => {
    const allErrors = await Promise.all(
      Object.keys(formData.value).map((key) => {
        return doValidate(key)
      })
    )
    return allErrors.filter((filedErrors) => !filedErrors.isTrue).length == 0
  }

  const isVerified = () => {
    return Object.values(formErrors.value).filter((err) => err?.isInvalid)?.length === 0
  }

  // const reset = (value: T | undefined = undefined) => {
  //   formData.reset(value)
  //   formErrors.reset()
  // }

  return {
    ...formData,

    // /**
    //  * 重置(包含)
    //  */
    // reset,
    /**
     * 进行验证单个属性
     * @description (如果调用发现校验异常,请使用 doValidateImme)
     */
    doValidate,
    /**
     * 进行验证单个属性:解决onChange时立即调用获取最新值的问题
     */
    doValidateImme,
    /**
     * 进行表单全校验
     * @description (如果调用发现校验异常,请使用 doAllValidateImme)
     */
    doAllValidate,
    /**
     * 进行表单全校验: 解决马上赋值,马上校验时获取不到最新值的问题
     * @returns : {isValid:校验是否正确,data:最新的数据}
     */
    doAllValidateImme,
    /**
     * 是否通过验证(不调用校验,基于当前的已存在的错误状态)
     */
    isVerified,
    /**
     * 错误状态
     */
    errors: formErrors.value,
    /**
     * 对错误的详细控制
     */
    formErrors,
    /**
     * 未结构的formData(一般用不到)
     */
    formData

    // /**
    //  * 常用校验
    //  */
    // Verifications
  }
}

/**
 * 表单数据,表单验证和错误
 * @description 处理不了嵌套对象验证
 * @param defaultValue
 */
export const useFormData = <T extends Record<string, any> = Record<string, any>>(
  defaultValue: T,
  verifications: IVerifications<T> = {}
) => {
  const form = useFormDataBase(...useState(defaultValue), verifications)
  return {
    ...form,
    reset: (value: T | undefined = undefined) => {
      form.setValue({
        ...defaultValue,
        ...(value || {})
      })
      form.formErrors.reset()
    }
  }
}

/**
 * 表单数据,嵌套表单验证
 */
export const useSubFormData = <
  T extends Record<string, any> = Record<string, any>,
  K extends keyof T = keyof T,
  V extends T[K] = T[K]
>(
  parentValue: IObjectData<T>,
  key: K,
  verifications: IVerifications<V> = {}
) => {
  return useFormDataBase(
    parentValue.value[key],
    (value) => parentValue.pushValue(key, value),
    verifications
  )
}
