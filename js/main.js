// DOM元素
const portfolioGrid = document.querySelector('.portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('workModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const modalDate = document.getElementById('modalDate');
const closeModal = document.querySelector('.close-modal');

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 加载所有作品
    loadPortfolioItems('all');
    
    // 设置筛选按钮事件
    setupFilterButtons();
    
    // 设置模态框事件
    setupModal();
});

// 加载作品项目
function loadPortfolioItems(filter) {
    // 清空现有内容
    portfolioGrid.innerHTML = '';
    
    // 筛选数据
    const filteredData = filter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filter);
    
    // 检查是否有匹配的项目
    if (filteredData.length === 0) {
        portfolioGrid.innerHTML = '<div class="no-items">没有找到匹配的作品</div>';
        return;
    }
    
    // 创建作品项目元素
    filteredData.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-id', item.id);
        
        // 格式化日期
        const formattedDate = formatDate(item.date);
        
        // 设置类别显示文本
        const categoryText = getCategoryText(item.category);
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p>${item.description.substring(0, 80)}${item.description.length > 80 ? '...' : ''}</p>
                <div class="portfolio-meta">
                    <span>${categoryText}</span>
                    <span>${formattedDate}</span>
                </div>
            </div>
        `;
        
        // 添加点击事件
        portfolioItem.addEventListener('click', () => {
            openModal(item);
        });
        
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // 添加动画效果
    animateItems();
}

// 设置筛选按钮事件
function setupFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的active类
            button.classList.add('active');
            
            // 获取筛选类别
            const filter = button.getAttribute('data-filter');
            
            // 加载筛选后的作品
            loadPortfolioItems(filter);
        });
    });
}

// 设置模态框事件
function setupModal() {
    // 关闭模态框事件
    closeModal.addEventListener('click', () => {
        closeModalWindow();
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalWindow();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow();
        }
    });
}

// 打开模态框
function openModal(item) {
    // 设置模态框内容
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modalCategory.textContent = getCategoryText(item.category);
    modalDate.textContent = formatDate(item.date);
    
    // 显示模态框
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

// 关闭模态框
function closeModalWindow() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // 恢复背景滚动
    
    // 延迟清除内容
    setTimeout(() => {
        modalImage.src = '';
        modalTitle.textContent = '';
        modalDescription.textContent = '';
        modalCategory.textContent = '';
        modalDate.textContent = '';
    }, 300);
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// 获取类别显示文本
function getCategoryText(category) {
    const categoryMap = {
        'animation': '动画',
        'ui': 'UI效果',
        'banner': '广告Banner'
    };
    
    return categoryMap[category] || category;
}

// 添加动画效果
function animateItems() {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach((item, index) => {
        // 设置延迟动画
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        // 触发重排以应用动画
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 10);
    });
}

// 添加图片加载错误处理
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'images/placeholder.svg';
        console.log('Image load error, replaced with placeholder');
    }
}, true);