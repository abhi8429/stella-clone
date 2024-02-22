
export const getYesOrNo = (booleanValue) => {
  if (booleanValue !== null || booleanValue !== '') {
    if (booleanValue === true) {
      return "Yes";
    } else if (booleanValue === false) {
      return "No";
    } else {
      return "N/A";
    }
  } else {
    return "N/A";
  }
}

export const clone = (object) => {
  return JSON.parse(JSON.stringify(object));
}

// /^\s*$/ -> This will include tab new line
export const isStringWithOnlySpaces = (str) => {
   return /^ *$/.test(str) || !str;
}

export const copy = (id) => {
    /* Get the text field */
    let copyText = document.getElementById(id);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
}

export const showPassword = (id) => {
  let x = document.getElementById(id);
  console.log(x);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


export const camelCaseToSentence = (str) => {
  return str.replace( /([A-Z])/g, " $1" ).trim();
}

export const scroll = (id) =>  {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

export const cropMessage = (lastChat, size=4) => {
  return (lastChat && lastChat.message ? lastChat.message : '').substring(0, size) + (lastChat ? '...' : '');
}

