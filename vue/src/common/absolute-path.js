
export const setAbsolutePath = () => {
      let path = getAbsolutePath();
      localStorage.setItem('path', path);
      localStorage.setItem('env', process.env.NODE_ENV);
}

export const getAbsolutePath = () => {

  let loc = window.location;
  let pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/'));
  if(process.env.NODE_ENV === 'development') {
    if (process.env.VUE_APP_SERVER_BASE_URL) {
      return process.env.VUE_APP_SERVER_BASE_URL;
    }
    return 'https://dev.stella.so'
    // return 'https://cfdev.servehttp.com'
  }
  //Comment it out for now, this includes the context
  // return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
  //remove the context
  return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - 0));
}
