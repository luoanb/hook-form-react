import { IErrors } from '.'
import { NextUI_2_2 } from './NextUI_2_2'

export type IuseAttr<T, K extends keyof T = keyof T> = {
  value: T
  errors: IErrors<T>
  pushValue: (key: K, value: T[K]) => void
}

/**
 * 绑定自定义组件的上下文信息
 */
export type RenderAttrProps<V = unknown> = {
  isError: boolean | undefined
  msg: React.ReactNode
  value: V
  setValue: (value: V) => void
}

/**
 * 自定义组件绑定的类型
 */
export type RenderAttr<R, V> = (props: RenderAttrProps<V>) => R

/**
 * 组件表单快速绑定
 */
export const useAttr = <T, K extends keyof T = keyof T>({
  value,
  errors,
  pushValue
}: IuseAttr<T>) => {
  const attr = <R>(key: K, renderAttr: RenderAttr<R, T[K]>) => {
    return renderAttr({
      value: value[key],
      isError: errors[key]?.isInvalid,
      msg: errors[key]?.msg,
      setValue: (value) => pushValue(key, value)
    })
  }
  attr.NextUI = NextUI_2_2
  return attr
}
