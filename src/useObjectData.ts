import { useState } from 'react'

/**
 * 可获取旧值的赋值
 */
export type CallSetValue<V> = V | ((oldValue: V) => V)

/**
 * 用于处理表单等对象型数据
 * @param defaultValue
 * @returns
 */
export const useObjectData = <T extends Record<string, any> = Record<string, any>>(
  defaultValue: T
) => {
  const [value, setValue] = useState(defaultValue)

  /**
   * 给对象的指定属性赋值
   * @param key
   * @param value
   */
  const pushValue = <K extends keyof T>(key: K, value: CallSetValue<T[K]>) => {
    setValue((old) => {
      if (typeof value == 'function') {
        return {
          ...old,
          // @ts-expect-error 略过一个异常情况校验
          [key]: value(old[key])
        }
      }
      return { ...old, [key]: value }
    })
  }

  /**
   * 重置为默认值
   */
  const reset = (value: Partial<T> | undefined = undefined) => {
    setValue({ ...defaultValue, ...(value || {}) })
  }

  /**
   * 更新对象的部分值，其他值保持
   */
  const assignValue = (value: Partial<T>) => {
    setValue((old) => ({ ...old, ...value }))
  }

  return {
    /**
     * 数据
     */
    value,
    /**
     * 赋值（一般不使用）
     */
    setValue,
    /**
     * 给对象的指定属性赋值
     * @param key
     * @param value
     */
    pushValue,
    /**
     * 更新对象的部分值，其他值保持
     */
    assignValue,
    /**
     * 重置为默认值
     */
    reset
  }
}
