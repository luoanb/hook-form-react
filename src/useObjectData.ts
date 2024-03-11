import { Dispatch, SetStateAction, useState } from 'react'

export type IObjectData<T> = {
  value: T
  setValue: React.Dispatch<React.SetStateAction<T>>
  pushValue: <K extends keyof T, V extends T[K] = T[K]>(key: K, value: CallSetValue<V>) => void
  assignValue: (value: Partial<T>) => void
  reset?: (value?: Partial<T> | undefined) => void
}

/**
 * 可获取旧值的赋值
 */
export type CallSetValue<V> = V | ((oldValue: V) => V)

/**
 * 处理ObjectState,但不存储数据
 * @param value
 * @param setValue
 * @returns
 */
export const useObjectState = <T extends Record<string, any> = Record<string, any>>(
  value: T,
  setValue: Dispatch<SetStateAction<T>>
) => {
  /**
   * 给对象的指定属性赋值
   * @param key
   * @param value
   */
  const pushValue = <K extends keyof T, V extends T[K] = T[K]>(key: K, value: CallSetValue<V>) => {
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
    assignValue
  }
}

/**
 * 用于处理表单等对象型数据
 * @param defaultValue
 * @returns
 */
export const useObjectData = <T extends Record<string, any> = Record<string, any>>(
  defaultValue: T
) => {
  const [value, setValue] = useState(defaultValue)
  const state = useObjectState(value, setValue)
  return {
    ...state,
    /**
     * 重置为默认值
     */
    reset: (value: Partial<T> | undefined = undefined) => {
      setValue({ ...defaultValue, ...(value || {}) })
    }
  }
}
