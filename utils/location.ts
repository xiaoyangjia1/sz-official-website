export function getNavKeyByPathName(pathname: string): string {
  let homeRegexp = /^(\/$|\/home)/,
    recruitmentRegexp = /^\/(recruitment|position)/;
  if (homeRegexp.test(pathname)) {
    return "home";
  } else if (recruitmentRegexp.test(pathname)) {
    return "recruitment";
  } else {
    return "personal";
  }
}
