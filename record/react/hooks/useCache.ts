import { useEffect } from 'react'

interface Func {
  (): Promise<boolean>
}

export interface CacheElement {
  func: Func
  key: any
  time: number
}

const cacheMaps = new Map<any, CacheElement & { incTime: number }>([])

let timeId: NodeJS.Timeout | null = null
let isExec = false

export function push(cacheItem: CacheElement) {
  cacheMaps.set(cacheItem.key, {
    ...cacheItem,
    incTime: cacheItem.time,
  })
  startExecFuncs(1000)
}

async function flushCacheFunc(index: number, time: number) {
  if (timeId) clearTimeout(timeId)
  if (cacheMaps.size < 1) return
  let pendingList = [] as Promise<boolean>[]

  cacheMaps.forEach((cache, i) => {
    let func = cache.func
    let incTime = (cache.incTime = (cache.incTime as number) - time)
    if (incTime <= 0) {
      pendingList.push(func())
      cache.incTime = cache.time
    }
  })

  let keys = cacheMaps.keys()
  let i = 0
  const allResponse = await Promise.all(pendingList)
  for (let ke of keys) {
    let r = allResponse[i++]
    if (r) {
      cacheMaps.delete(ke)
    }
  }
  timeId = setTimeout(() => flushCacheFunc(index, time), time)
}

function startExecFuncs(time: number) {
  if (isExec) return
  isExec = true
  flushCacheFunc(1000, time)
}

push({
  func: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false)
        console.log('三秒执行')
      }, 3000)
    })
  },
  time: 1000,
  key: '131',
})

push({
  func: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
        console.log('二秒')
      }, 2000)
    })
  },
  time: 2000,
  key: '121',
})

push({
  func: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false)
        console.log('2=二秒')
      }, 2000)
    })
  },
  time: 3000,
  key: '11',
})

interface CacheProps {
  time?: number
}

export function useMountd({ time = 1000 }: CacheProps) {
  useEffect(() => {
    startExecFuncs(time)
  }, [])
}
