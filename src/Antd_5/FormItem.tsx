import React, { PropsWithChildren } from 'react'
export type FormItemProps = Partial<{
  /**
   * 提醒文案
   */
  msg: React.ReactNode
  /**
   * 是否错误
   */
  isError: boolean
  /**
   * 错误文字颜色
   */
  errorColor: string
  labelProps: React.HtmlHTMLAttributes<HTMLParagraphElement>
}> &
  React.HtmlHTMLAttributes<HTMLDivElement>
export const FormItem = ({
  children,
  style,
  labelProps,
  errorColor = '#EC5B56',
  ...props
}: PropsWithChildren<FormItemProps>) => {
  // @ts-ignore
  const { fontSize = 12 } = style || {}
  return (
    <div {...props} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {children}
      <p
        {...labelProps}
        style={{ ...labelProps?.style, fontSize, color: props.isError ? errorColor : undefined }}
      >
        {props.msg}
      </p>
    </div>
  )
}
