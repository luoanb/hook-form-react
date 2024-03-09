// tailwind.config.js
import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}' // pnpm 二级依赖被隐藏, 需要到根目录去下载
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '8px', // rounded-small
          medium: '12px', // rounded-medium
          large: '14px' // rounded-large
        }
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#2242DF',
              foreground: '#FFFFFF'
            }
          }
        }
      }
    })
  ]
}
