export function getNavKeyByPathName(pathname: string): string {
  let homeRegexp = /^(\/$|\/home)/,
    recruitmentRegexp = /^\/(recruitment|position)/,
    personalRegexp = /^\/personal/;
  if (homeRegexp.test(pathname)) {
    return "home";
  } else if (recruitmentRegexp.test(pathname)) {
    return "recruitment";
  } else if (personalRegexp.test(pathname)) {
    return "personal";
  } else {
    return "login";
  }
}
