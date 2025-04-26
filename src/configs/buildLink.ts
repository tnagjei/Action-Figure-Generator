export const getLinkHref = (locale = 'en', page = '') => {
  if (page == '') {
    if (locale == 'en') {
      return '/';
    }
    return `/${locale}/`;
  }
  if (locale == 'en') {
    return `/${page}`;
  }
  return `/${locale}/${page}`;
}


export const getCompressionImageLink = (url) => {
  // 如果 URL 已经是完整的 URL，直接返回
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    return url;
  }
  
  const beginUrl = process.env.NEXT_PUBLIC_STORAGE_URL || '';
  return beginUrl + '/cdn-cgi/image/width=512,quality=85/' + url;
}


export const getArrayUrlResult = (origin) => {
  if (!origin) {
    return [];
  }
  
  try {
    // 如果已经是数组，直接返回
    if (Array.isArray(origin)) {
      return origin;
    }
    
    // 如果 origin 是字符串，但不是 JSON 格式，则将其视为单个 URL
    if (typeof origin === 'string' && !origin.startsWith('[') && !origin.startsWith('{')) {
      return [origin];
    }
    
    // 尝试解析 JSON
    const jsonResult = JSON.parse(origin);
    if (Array.isArray(jsonResult) && jsonResult.length > 0) {
      return jsonResult;
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    // 如果解析失败，但 origin 是字符串，则将其视为单个 URL
    if (typeof origin === 'string') {
      return [origin];
    }
  }
  
  return [];
}

export const getTotalLinkHref = (locale = 'en', page = '') => {
  if (page == '') {
    if (locale == 'en') {
      return process.env.NEXT_PUBLIC_SITE_URL + '/';
    }
    return process.env.NEXT_PUBLIC_SITE_URL + `/${locale}/`;
  }
  if (locale == 'en') {
    return process.env.NEXT_PUBLIC_SITE_URL + `/${page}`;
  }
  return process.env.NEXT_PUBLIC_SITE_URL + `/${locale}/${page}`;
}

export const getShareToPinterest = (locale = 'en', page = '', sticker:string) => {
  const pinterestUrl = 'https://pinterest.com/pin/create/button/';
  return pinterestUrl + `?description=${encodeURIComponent(sticker)}` + `&url=` + encodeURIComponent(getTotalLinkHref(locale, page));
}
