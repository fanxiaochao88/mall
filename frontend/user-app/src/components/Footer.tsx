/**
 * 底部组件
 */
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <ul className="space-y-2 text-gray-400">
              <li>公司简介</li>
              <li>联系我们</li>
              <li>招聘信息</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">客户服务</h3>
            <ul className="space-y-2 text-gray-400">
              <li>帮助中心</li>
              <li>售后服务</li>
              <li>配送方式</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">其他</h3>
            <ul className="space-y-2 text-gray-400">
              <li>隐私政策</li>
              <li>服务条款</li>
              <li>网站地图</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 Mall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
