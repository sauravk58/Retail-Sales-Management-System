export const formatCurrency = (amount, currency = '₹') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0`;
  }
  
  const num = parseFloat(amount);
  
  if (num >= 10000000) {
    return `${currency}${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `${currency}${(num / 100000).toFixed(2)} L`;
  } else if (num >= 1000) {
    return `${currency}${num.toLocaleString('en-IN')}`;
  }
  
  return `${currency}${num.toLocaleString('en-IN')}`;
};

export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0';
  }
  return num.toLocaleString('en-IN');
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch {
    return dateStr;
  }
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '-';
  return phone;
};

export const truncateText = (text, maxLength = 20) => {
  if (!text) return '-';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const formatQuantity = (qty) => {
  if (qty === null || qty === undefined) return '0';
  return String(qty).padStart(2, '0');
};