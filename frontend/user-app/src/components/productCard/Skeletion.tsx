import React from 'react';
import { Card, Skeleton } from 'antd';

interface ProductCardSkeletonProps {
  count?: number; // 需要渲染几个骨架卡片
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ count = 1 }) => {
  // 根据数量生成数组
  const list = Array.from({ length: count }).fill(0);

  return (
    <>
      {list.map((_, index) => (
        <Card
          key={index}
          className="h-full border rounded-lg overflow-hidden"
          styles={{ body: { padding: '12px' } }}
        >
          {/* 图片占位：模拟 h-48 的高度 */}
          <Skeleton.Image 
            active 
            className="!w-full !h-48"
            style={{ width: '100%', height: '192px' }}
          />
          
          {/* 文字占位：模拟标题和价格 */}
          <div className="mt-3">
            <Skeleton.Input active size="small" className="!w-full !h-[22px] mb-2" />
            <Skeleton.Input active size="small" className="!w-1/2 !h-[22px] mb-2" />
            <Skeleton.Input active size="small" className="!w-full !h-[22px]" />
          </div>
        </Card>
      ))}
    </>
  );
};

export default ProductCardSkeleton;
