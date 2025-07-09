export interface StoredUser {
    id: string;
    name: string;
    email: string;
    role: string; // Sửa String thành string (lowercase)
    avatar?: string;
    phone?: string;
    isAdmin?: boolean;
    createdAt?: string;
    updatedAt?: string;
    // Thêm các thuộc tính optional khác nếu cần
    [key: string]: any; // Cho phép thêm thuộc tính khác
}

// Utility function để parse user từ localStorage an toàn
export const parseUserFromStorage = (): StoredUser | null => {
    try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return null;

        const parsed = JSON.parse(storedUser);

        // Validate required fields
        if (!parsed.id || !parsed.name || !parsed.email) {
            console.warn('Invalid user data in localStorage:', parsed);
            localStorage.removeItem('user');
            return null;
        }

        return parsed as StoredUser;
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        return null;
    }
};

// Type guard để check user có đủ thuộc tính cần thiết
export const isValidUser = (user: any): user is StoredUser => {
    return (
        user &&
        typeof user.id === 'string' &&
        typeof user.name === 'string' &&
        typeof user.email === 'string' &&
        typeof user.role === 'string'
    );
};
