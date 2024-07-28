export const NAME_REGEX: RegExp = /^\p{L}{3,30}$/u;
export const USERNAME_REGEX: RegExp = /^[a-z0-9_-]{3,30}$/;
export const PASSWORD_REGEX: RegExp =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{6,30}$/;
export const EMAIL_REGEX: RegExp =
  /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
export const HASHTAG_REGEX: RegExp = /#\w+/g;
export const MENTION_REGEX: RegExp = /@\w+/g;
export const URL_REGEX: RegExp =
  /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/g;
