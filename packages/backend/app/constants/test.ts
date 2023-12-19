import fs from 'fs'
import path from 'path'
import process from 'process'

type Position = {
  x: number
  y: number
}

type Response<T> = {
  status: number
  data: T
}

const res: Response<string> = {
  status: 200,
  data: 'ok'
}

type Point = [number, string]

const p: Point = [1, '1']

type Size = 'small' | 'medium' | 'large'

type Props = {
  name: string
  age: number
}

type ExtProps = Props & { address: string }

type User = {
  name: string
  age: number
  address: string
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
