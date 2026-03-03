import React from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type {  ProductItem  } from '@/types/product';

interface Props {
  product: ProductItem,
  mode?: 'default' | 'overlay'
}

const { Text } = Typography;


const ProductCard: React.FC<Props> = ({ product, mode = 'default' }) => {
  
  // 价格显示逻辑
  const renderPrice = () => {
    const priceStr = `¥${product.min_price.toFixed(2)}`;
    if (product.max_price !== product.min_price) {
      return `${priceStr} - ¥${product.max_price.toFixed(2)}`;
    }
    return priceStr;
  };

  // --- 模式一：文字浮层 (用于首页楼层) ---
  if (mode === 'overlay') {
    return (
      <Link to={`/product/${product.id}`}>
        <div className="group relative overflow-hidden rounded-lg cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
          {/* 图片区域 */}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* 文字浮层 (底部渐变) */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 h-24 flex flex-col justify-end">
            <div 
              className="!text-white font-medium text-sm"
            >
              {product.name}
            </div>
            <div className="flex justify-between items-center mt-1">
              <Text className="!text-red-400 font-bold text-sm">{renderPrice()}</Text>
              <Text className="!text-gray-300 text-xs">{product.sales}人付款</Text>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // --- 模式二：默认上图下文 (用于商品列表/推荐区) ---
  return (
    <Link to={`/product/${product.id}`}>
      <Card
        hoverable
        className="h-full flex flex-col border rounded-lg overflow-hidden"
        cover={
          <div className="relative overflow-hidden">
            <img 
              alt={product.name} 
              src={product.image} 
              className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        }
        styles={{ body: { padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }}
      >
        {/* 标题 */}
        <div className="font-medium text-gray-800 mb-2 block min-h-[44px]">
          {product.name}
        </div>
        
        {/* 底部信息 */}
        <div>
          <div className="flex items-baseline gap-1">
            <Text type="danger" className="text-lg font-bold">{renderPrice()}</Text>
          </div>
          <div className="flex justify-between items-center mt-1">
            <Text type="secondary" className="text-xs">{product.merchant_name}</Text>
            <Text type="secondary" className="text-xs">{product.sales} 已售</Text>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
