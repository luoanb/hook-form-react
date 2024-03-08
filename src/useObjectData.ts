import { useState } from "react"

/**
 * 用于处理表单等对象型数据
 * @param defaultValue
 * @returns
 */
export const useObjectData = <
  T extends Record<string, any> = Record<string, any>,
  K extends keyof T = keyof T,
  V extends T[K] = T[K]
>(
  defaultValue: T
) => {
  // const [errors, setErrors] = useState<IErrors<T>>({})
  const [value, setValue] = useState(defaultValue)

  const pushValue = (key: K, value: V) => {
    setValue((old) => ({ ...old, [key]: value }))
  }

  const reset = (value: T | undefined = undefined) => {
    setValue({ ...defaultValue, ...(value || {}) })
  }

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
     * 重置
     */
    reset
  }
}
