const errorState = {
  // 驗證相關錯誤
  'auth/email-already-exists': { statusCode: 400, message: '此 Email 已被註冊' },
  'auth/invalid-email': { statusCode: 400, message: 'Email 格式不正確' },
  'auth/invalid-password': { statusCode: 401, message: '密碼錯誤，請重新輸入' },
  'auth/user-not-found': { statusCode: 404, message: '用戶不存在，請先註冊' },
  'auth/too-many-requests': { statusCode: 429, message: '請稍後再試，您的請求過於頻繁' },
  'auth/id-token-expired': { statusCode: 401, message: '驗證已過期，請重新登入' },
  'auth/argument-error': { statusCode: 400, message: '參數錯誤' },

  // Firestore 資料庫錯誤
  'permission-denied': { statusCode: 403, message: '您沒有權限執行此操作' },
  'not-found': { statusCode: 404, message: '找不到指定的文件或資源' },

  // Storage 上傳錯誤
  'storage/unauthorized': { statusCode: 403, message: '您沒有上傳檔案的權限' },
  'storage/quota-exceeded': { statusCode: 403, message: '已超過儲存空間限制，請聯絡管理員' },

  // 找不到路由
  ROUTE_NOT_FOUND: { statusCode: 404, message: '找不到指定的路由' },

  // 身份驗證錯誤
  AUTHENTICATION_FAILED: { statusCode: 401, message: '身份驗證失敗，請重新登入' },

  // 缺少必要參數
  MISSING_DATA: { statusCode: 400, message: '缺少必要參數' },

  // 用戶不存在
  USER_NOT_FOUND: { statusCode: 404, message: '用戶不存在' },

  // 預設錯誤
  DEFAULT: { statusCode: 500, message: '未知錯誤，請稍後再試' }
};

export default errorState;
