# React Query 状态管理最佳实践

## 问题背景

### 原始问题描述

在开发首页时，使用 `useHome` hook 同时管理轮播图和商品列表数据。商品列表需要在多个场景使用：
- 推荐模块（热门推荐/最新上市/热门单品切换）
- 商品楼层（按分类展示，3个楼层）
- 未来的商品列表页（支持筛选、分页、搜索）

### 发现的 Bug

**症状**：推荐模块切换 tab（推荐→热门）时，获取数据的参数受到楼层模块的影响

**根本原因**：
```tsx
// HomePage.tsx 中有 4 个组件调用 useHome()
<RecommendedTabs />           // useHome() -> params = { type: 'recommend', page_size: 30 }
<ProductFloor category_id={11} />  // useHome() -> params = { type: 'all', category_id: 11, page_size: 7 }
<ProductFloor category_id={12} />  // useHome() -> params = { type: 'all', category_id: 12, page_size: 7 }
<ProductFloor category_id={2} />   // useHome() -> params = { type: 'all', category_id: 2, page_size: 7 }
```

虽然每个组件的 `productParams` state 是独立的，但它们都在操作同一个 react-query 缓存空间，导致：
1. **状态共享冲突**：多个组件的参数互相覆盖
2. **数据错乱**：推荐模块可能读取到楼层的数据
3. **语义混乱**：`useHome` 职责不清晰（既管理首页数据，又管理商品列表）

---

## 解决方案

### 方案一：拆分 Hook（已采用）

**核心思想**：单一职责原则，将商品列表查询独立出来

#### 1. 创建独立的 `useProducts` hook

```tsx
// hooks/serverData/useProducts.ts
import { useQuery } from '@tanstack/react-query'
import { productApi } from '@/api/product'
import type { ProductListQuery } from '@/types'
import { useState } from 'react'

export function useProducts(initialParams: ProductListQuery) {
  const [params, setParams] = useState<ProductListQuery>(initialParams)

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', params],  // ✅ 独立的缓存 key
    queryFn: () => productApi.getProducts(params),
  })

  // 便捷方法
  const changeType = (type: ProductListQuery['type']) => {
    setParams(prev => ({ ...prev, type, page: 1 }))
  }

  const changeCategory = (category_id: number) => {
    setParams(prev => ({ ...prev, category_id, page: 1 }))
  }

  const changePage = (page: number) => {
    setParams(prev => ({ ...prev, page }))
  }

  return {
    products: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
    params,
    setParams,
    changeType,
    changeCategory,
    changePage,
  }
}
```

#### 2. 简化 `useHome` 只管理轮播图

```tsx
// hooks/serverData/useHome.ts
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { productApi } from '@/api/product'
import type { Banner } from '@/types'

export function useHome() {
  const queryClient = useQueryClient()

  const { data: banners, isLoading: isBannersLoading } = useQuery<Banner[]>({
    queryKey: ['home', 'banners'],
    queryFn: () => productApi.getBanners(),
  })

  const refreshBanners = () => {
    queryClient.invalidateQueries({ queryKey: ['home', 'banners'] })
  }

  return {
    banners,
    isBannersLoading,
    refreshBanners,
  }
}
```

#### 3. 各组件独立使用

```tsx
// 推荐模块
const { products, changeType, isLoading } = useProducts({
  type: 'recommend',
  category_id: 0,
  page: 1,
  page_size: 30,
})

// 楼层模块
const { products, isLoading } = useProducts({
  type: 'all',
  category_id: props.category_id,
  page: 1,
  page_size: 7,
})

// 商品列表页
const { products, setParams, changePage } = useProducts({
  type: 'all',
  category_id: 0,
  page: 1,
  page_size: 20,
})
```

---

### 方案二：URL 驱动（适合商品列表页）

商品列表页应该用 URL 参数驱动，支持分享和刷新：

```tsx
// pages/productList/index.tsx
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // 从 URL 读取参数
  const params: ProductListQuery = {
    type: searchParams.get('type') as ProductListQuery['type'] || 'all',
    category_id: Number(searchParams.get('category_id')) || 0,
    keyword: searchParams.get('keyword') || '',
    page: Number(searchParams.get('page')) || 1,
    page_size: 20,
  }

  // 使用 URL 参数作为 query key
  const { data, isLoading } = useQuery({
    queryKey: ['products', params],
    queryFn: () => productApi.getProducts(params),
  })

  // 切换筛选条件 -> 更新 URL
  const handleFilterChange = (newParams: Partial<ProductListQuery>) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...newParams,
      page: '1', // 重置页码
    })
  }

  return (
    <div>
      <Filters onChange={handleFilterChange} />
      <ProductList products={data?.items} />
      <Pagination
        current={params.page}
        onChange={(page) => handleFilterChange({ page })}
      />
    </div>
  )
}
```

**优势**：
- ✅ URL 可分享：`/products?type=hot&category_id=1`
- ✅ 刷新保持状态
- ✅ 浏览器前进/后退支持
- ✅ SEO 友好

---

## React Query 核心概念

### 1. Query Key 的作用

Query Key 是 React Query 的核心，它决定了：
- **缓存标识**：相同 key 共享缓存
- **自动重新获取**：key 变化时自动触发新请求
- **缓存失效**：通过 key 精确控制失效范围

```tsx
// ❌ 错误：所有商品列表共享同一个缓存
queryKey: ['products']

// ✅ 正确：不同参数使用不同缓存
queryKey: ['products', { type: 'hot', page: 1 }]
queryKey: ['products', { type: 'new', page: 1 }]
queryKey: ['products', { category_id: 11, page: 1 }]
```

### 2. 缓存策略

```tsx
useQuery({
  queryKey: ['products', params],
  queryFn: () => productApi.getProducts(params),

  // 缓存时间（数据在内存中保留多久）
  gcTime: 5 * 60 * 1000, // 5分钟（默认）

  // 数据新鲜度（多久后视为过期）
  staleTime: 30 * 1000, // 30秒内不重新请求

  // 窗口聚焦时重新获取
  refetchOnWindowFocus: true,

  // 网络重连时重新获取
  refetchOnReconnect: true,

  // 组件挂载时重新获取
  refetchOnMount: true,
})
```

**推荐配置**：
- **频繁变化的数据**（商品列表）：`staleTime: 0`（默认）
- **相对稳定的数据**（分类列表）：`staleTime: 5 * 60 * 1000`
- **几乎不变的数据**（配置项）：`staleTime: Infinity`

---

## 常用场景与最佳实践

### 场景 1：列表 + 详情

```tsx
// 列表页
const { data: products } = useQuery({
  queryKey: ['products', 'list'],
  queryFn: () => productApi.getList(),
})

// 详情页
const { data: product } = useQuery({
  queryKey: ['products', 'detail', id],
  queryFn: () => productApi.getDetail(id),

  // 从列表缓存中初始化详情数据
  initialData: () => {
    return queryClient
      .getQueryData(['products', 'list'])
      ?.find(p => p.id === id)
  },
})
```

### 场景 2：依赖查询

```tsx
// 先获取用户信息，再获取用户订单
const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: () => userApi.getProfile(),
})

const { data: orders } = useQuery({
  queryKey: ['orders', user?.id],
  queryFn: () => orderApi.getOrders(user.id),
  enabled: !!user?.id, // 只有 user.id 存在时才执行
})
```

### 场景 3：无限滚动

```tsx
import { useInfiniteQuery } from '@tanstack/react-query'

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['products', 'infinite'],
  queryFn: ({ pageParam = 1 }) =>
    productApi.getProducts({ page: pageParam, page_size: 20 }),
  getNextPageParam: (lastPage, pages) =>
    lastPage.hasMore ? pages.length + 1 : undefined,
  initialPageParam: 1,
})

// 渲染
{data?.pages.map((page, i) => (
  <div key={i}>
    {page.items.map(product => <ProductCard key={product.id} product={product} />)}
  </div>
))}
<button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
  {isFetchingNextPage ? '加载中...' : '加载更多'}
</button>
```

### 场景 4：乐观更新

```tsx
const mutation = useMutation({
  mutationFn: (newProduct) => productApi.create(newProduct),

  // 乐观更新
  onMutate: async (newProduct) => {
    // 取消正在进行的查询
    await queryClient.cancelQueries({ queryKey: ['products'] })

    // 保存旧数据（用于回滚）
    const previousProducts = queryClient.getQueryData(['products'])

    // 乐观更新缓存
    queryClient.setQueryData(['products'], (old) => [...old, newProduct])

    return { previousProducts }
  },

  // 失败时回滚
  onError: (err, newProduct, context) => {
    queryClient.setQueryData(['products'], context.previousProducts)
  },

  // 成功后重新获取
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
  },
})
```

### 场景 5：轮询

```tsx
const { data } = useQuery({
  queryKey: ['order', orderId],
  queryFn: () => orderApi.getStatus(orderId),
  refetchInterval: 3000, // 每3秒轮询一次
  refetchIntervalInBackground: true, // 后台也轮询
})
```

---

## 常见错误与注意事项

### ❌ 错误 1：Query Key 不包含参数

```tsx
// ❌ 错误：参数变化时不会重新请求
const [params, setParams] = useState({ page: 1 })
useQuery({
  queryKey: ['products'], // key 没变
  queryFn: () => api.getProducts(params),
})

// ✅ 正确：参数变化时自动重新请求
useQuery({
  queryKey: ['products', params],
  queryFn: () => api.getProducts(params),
})
```

### ❌ 错误 2：在多个组件中共享 state

```tsx
// ❌ 错误：多个组件调用同一个 hook，state 独立但缓存共享
function useSharedData() {
  const [params, setParams] = useState({ type: 'all' })
  return useQuery({
    queryKey: ['data', params],
    queryFn: () => api.getData(params),
  })
}

// ✅ 正确：每个组件传入独立的参数
function useData(params: Params) {
  return useQuery({
    queryKey: ['data', params],
    queryFn: () => api.getData(params),
  })
}
```

### ❌ 错误 3：过度使用 invalidateQueries

```tsx
// ❌ 错误：每次操作都失效所有缓存
mutation.mutate(data, {
  onSuccess: () => {
    queryClient.invalidateQueries() // 失效所有查询
  }
})

// ✅ 正确：精确失效相关查询
mutation.mutate(data, {
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }
})
```

### ❌ 错误 4：忘记处理 enabled

```tsx
// ❌ 错误：userId 为 undefined 时仍然请求
useQuery({
  queryKey: ['user', userId],
  queryFn: () => api.getUser(userId), // userId 可能是 undefined
})

// ✅ 正确：只有 userId 存在时才请求
useQuery({
  queryKey: ['user', userId],
  queryFn: () => api.getUser(userId!),
  enabled: !!userId,
})
```

---

## 性能优化建议

### 1. 合理设置 staleTime

```tsx
// 全局配置
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1分钟内不重复请求
    },
  },
})
```

### 2. 使用 select 减少重渲染

```tsx
// ❌ 数据变化时，即使只用 id，组件也会重渲染
const { data } = useQuery({
  queryKey: ['user'],
  queryFn: () => api.getUser(),
})
const userId = data?.id

// ✅ 只有 id 变化时才重渲染
const userId = useQuery({
  queryKey: ['user'],
  queryFn: () => api.getUser(),
  select: (data) => data.id,
})
```

### 3. 预取数据

```tsx
// 鼠标悬停时预取详情
const handleMouseEnter = (id: number) => {
  queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getDetail(id),
  })
}
```

### 4. 并行查询

```tsx
// ✅ 并行请求，不阻塞
const queries = useQueries({
  queries: [
    { queryKey: ['banners'], queryFn: () => api.getBanners() },
    { queryKey: ['categories'], queryFn: () => api.getCategories() },
    { queryKey: ['products'], queryFn: () => api.getProducts() },
  ],
})
```

---

## 总结

### 核心原则

1. **单一职责**：一个 hook 只管理一类数据
2. **参数驱动**：Query Key 必须包含所有影响数据的参数
3. **独立状态**：避免多个组件共享 state，应该传入独立参数
4. **精确失效**：使用精确的 queryKey 失效缓存，避免过度失效

### 本次重构收益

| 维度 | 重构前 | 重构后 |
|------|--------|--------|
| **Bug** | ✅ 修复状态冲突 | 推荐和楼层数据独立 |
| **可维护性** | ❌ useHome 职责混乱 | ✅ useHome 只管轮播图，useProducts 管商品 |
| **可扩展性** | ❌ 商品列表页难以复用 | ✅ useProducts 可用于任何商品列表场景 |
| **缓存管理** | ⚠️ 缓存 key 容易冲突 | ✅ 每个场景独立缓存 |

### 下一步

商品列表页开发时，使用 **URL 驱动 + useProducts** 的组合方案，既能复用逻辑，又能支持 URL 分享和刷新。
