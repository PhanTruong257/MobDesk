// Cấu hình layout cho các routes
export const routeConfig = {
    // Các trang không cần header và footer
    noLayoutPages: ['/login'],

    // Các trang admin (có thể dùng layout riêng sau này)
    adminPages: ['/admin', '/admin/product-list', '/admin/order-list', '/admin/user-list'],

    // Các trang công khai
    publicPages: ['/', '/products', '/product/:id', '/about', '/contact', '/help', '/category/:category'],

    // Các trang cần đăng nhập
    protectedPages: ['/cart', '/profile']
};

// Helper function để kiểm tra layout
export const shouldShowLayout = (pathname: string): boolean => {
    return !routeConfig.noLayoutPages.includes(pathname);
};

export const isAdminPage = (pathname: string): boolean => {
    return routeConfig.adminPages.some(page => pathname.startsWith(page.replace('/*', '')));
};

export const isProtectedPage = (pathname: string): boolean => {
    return routeConfig.protectedPages.some(page =>
        pathname === page || pathname.startsWith(page.replace('/*', ''))
    );
};
