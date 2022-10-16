/**
 * @description 正则表达式 (数据验证)
 */
// 英文
const checkEng = (value: string): boolean => /^[a-zA-Z]+$/.test(value);

// 数字
const checkNum = (value: string): boolean => /^[0-9]+$/.test(value);

// 中文
const checkHan = (value: string): boolean => /\p{Unified_Ideograph}/u.test(value);

// 密码(中文、英文、数字)
const checkPassword = (value: string): boolean =>
  /^([a-zA-Z]|[0-9]|~|!|@|#|\$|%|\^|&|\*|\(|\)|_|\+|=|\{|}|\||<|>|,|\.|\?|;|:)+$/.test(value);

// 用户名(中文、英文、数字)
const checkUserName = (value: string): boolean => /^([a-zA-Z]|[0-9]|\p{Unified_Ideograph})+$/u.test(value);

export { checkEng, checkNum, checkHan, checkPassword, checkUserName };
