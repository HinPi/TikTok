export const ROUTE_KEYS = Object.freeze({
  HOME: 'Home',
  LOGIN: 'Login',
  FRIENDS: 'Friends',
  NOTIFICATION: 'Notification',
  PERSONAL: 'Personal',
  LIST: 'List',
  RECORD_VIDEO: 'record',
  UPLOAD: 'Upload',
  OTHER_PROFILE: 'OtherProfile',
  SETTING: 'Setting'
});

export const PATH = {
  LOGIN: '/login',
  VIDEO: '/video',
  PROFILE: '/profile',
  LIKED: '/video/likedvideo',
  COMMENT: '/comment'
};

export const DATE_FORMATS = { dddd_DD_MM_YYYY: 'dddd.DD-MM-YYYY', DD_MM_YYYY: 'YYYY-MM-DD' + 'T' + 'HH:mm:ss', HH_mm: 'HH:mm' };

export const DEFAULT_HEIGHT = {
  TAB_BAR: 50
};

export const generateUUID = (digits: number) => {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
  const uuid = [];
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join('');
};
