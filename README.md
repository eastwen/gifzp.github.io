# GIF作品集网站

这是一个用于展示GIF动画作品的静态网站，采用纯HTML、CSS和JavaScript构建，无需任何框架。

## 功能特点

- 响应式设计，适配各种设备屏幕
- 作品分类筛选功能
- 点击作品查看详情
- 简洁现代的UI设计
- 流畅的动画和过渡效果

## 项目结构

```
gif-portfolio/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── data.js         # 作品数据
│   └── main.js         # 主要脚本
└── images/             # 存放GIF图片和资源
    └── placeholder.svg # 图片加载占位符
```

## 使用说明

### 添加新作品

1. 将GIF图片文件放入 `images` 文件夹中
2. 在 `js/data.js` 文件中添加新作品的信息，格式如下：

```javascript
{
    id: 数字ID,
    title: "作品标题",
    description: "作品描述",
    image: "images/文件名.gif",
    category: "分类名称", // animation, ui 或 banner
    date: "YYYY-MM-DD" // 创建日期
}
```

### 自定义分类

如需添加或修改分类：

1. 在 `index.html` 中修改筛选按钮：

```html
<button class="filter-btn" data-filter="新分类名">显示文本</button>
```

2. 在 `js/main.js` 文件中的 `getCategoryText` 函数中添加新分类的映射：

```javascript
const categoryMap = {
    // 已有分类
    '新分类名': '显示文本'
};
```

## 本地运行

由于这是一个纯静态网站，您可以直接在浏览器中打开 `index.html` 文件查看，或者使用任何静态文件服务器托管这些文件。

## 浏览器兼容性

本网站兼容所有现代浏览器，包括：

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 自定义样式

如需修改网站外观，请编辑 `css/style.css` 文件。文件中包含详细的注释，帮助您理解和修改各个部分的样式。#   g i f z p . g i t h u b . i o  
 