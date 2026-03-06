/**
 * SKU 选择器逻辑封装
 */

import type { ProductSKU } from "@/types";
import { useMemo } from "react";

export function useSKUSelector(skus: ProductSKU[]) {

  // 从sku[] => { color: ['红色', '白色'], size: ['大', '小'] }
  const attributes = useMemo(() => {
    const attrs: Record<string, Set<string>> = {}

    skus.forEach(sku => {
      if (sku.attributes) {
        Object.entries(sku.attributes).forEach(([key, value]) => {
          if (!attrs[key]) {
            attrs[key] = new Set()
            attrs[key].add(value)
          }
        })
      }
    })

    let res: Record<string, string[]> = {}

    Object.entries(attrs).forEach(([key, setValue]) => {
      res = {
        ...res,
        [key]: Array.from(setValue)
      }
    })

    return res

  }, [skus])

  return {
    attributes
  }
}
