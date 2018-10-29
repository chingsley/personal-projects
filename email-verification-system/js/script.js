
// Return true is an email ends with '.com', else return false
function dotCom(email) {
  const i = email.lastIndexOf('@');
  const dom = email.slice(i+1);
  let d = dom.lastIndexOf('.com');
  if(dom[d+4] === undefined){
    return true;
  } else {
    return false;
  }
}

// Return true is an email ends with '.org', else return false
function dotOrg(email) {
  const i = email.lastIndexOf('@');
  const dom = email.slice(i+1);
  let d = dom.lastIndexOf('.org');
  if(dom[d+4] === undefined){
    return true;
  } else {
    return false;
  }
}

// Return true is an email ends with '.org', else return false
function dotNet(email) {
  const i = email.lastIndexOf('@');
  const dom = email.slice(i+1);
  let d = dom.lastIndexOf('.net');
  if(dom[d+4] === undefined){
    return true;
  } else {
    return false;
  }
}

// Return false if the domain name contains an invalid character
function isValidDomChar(char, dom) {
  if((char.codePointAt(0) >= 65 && char.codePointAt(0) <= 90)){
    return true;
  }
  if((char.codePointAt(0) >= 97 && char.codePointAt(0) <= 122)){
    return true;
  }
  if((char === '-' && dom.indexOf(char) != 0)){
    return true;
  }
  if(char === '.'){
    return true;
  }
  if(!isNaN(Number(char))){
    return true;
  }

  return false;
}

// format of email address is [ local-part@domain ]
/**
 * 
 * @param {local-part} = lp 
 * @param {domain} = dom 
 */

const verifyEmail = (str) => {
  let msg = '';

  // If mail does not contain '@' return error
  if(str.indexOf('@') < 0) {
    msg = `email: missing '@' character`;
    return {error: true, message: msg};
  }
  console.log(str);
  let quoted = false;
  const i = str.lastIndexOf('@');
  const dom = str.slice(i+1);
  const domArr = dom.split('');
  const lp = str.slice(0, i);
  const lpArr = lp.split('');
  const specialChars = `"(),:;<>@[\\]`.split('');

  // To determine whether the local-part of email is quoted (in double quotation marks)
  if(lp[0] === `"` && lp[lp.length - 1] === `"`) {
    quoted = true;
  }

  if (lp.length < 1) {
    msg = `email: missing local-part. Format: [local-part]@[domain]`;
    return {error: true, message: msg};
  }

  if(dom.length < 1) {
    msg = `email: missing domain name. Format: [local-part]@[domain]`;
    return { error: true, message: msg};
  }

  if(lp.length > 64) {
    msg = `email: The Local Part cannot contain more than 64 characters`;
    return {error: true, message: msg};
  }

  

  if(dom.length > 255) {
    msg = `email: domain name cannot cannot contain more than 255 characters`;
    return {error: true, message: msg};
  }

  // local-part cannot start or end with a dot
  if(lpArr[0] === '.' || lpArr[lpArr.length - 1] === '.') {
    msg = `email: a dot (.) cannot start or end your email name, unless quoted`;
    return {error: true, message: msg};
  }

    // email (local-part) name should not contain consecutive dots
    let x = -1;
    for (let i = 0; i < lp.length; i++) {
      x = lp.indexOf('.', x + 1); // starts from index 0, and finds the next instance of '.' with every loop
      // console.log(x);
      let y = x + 1; // n is index of the next character following the current dot
      if(lp[x] === lp[y]) {
        msg = `email: consecutive dots are not allowed, unless quoted`;
        return {error: true, message: msg};
      }
    }

  // cannot contain more than one @ without quotes
    if((lp.indexOf('@') > -1)&& !quoted) {
      msg = `email: only one @ is allowed outside quotation marks`;
      return {error: true, message: msg};
    }

     // cannot contain a space without quotes
    if((lp.indexOf(' ') > -1)&& !quoted) {
      msg = `email: cannot contain a space, unless quoted`;
      return {error: true, message: msg};
    }

  // cannot contain some special chars like "(),:;<>@[\\] without qoutes
  for(let i = 0; i < specialChars.length; i ++){
    if((lp.indexOf(specialChars[i]) > -1) && !quoted) {
      msg = `email: cannot contain ${specialChars[i]} outside quotation marks`;
      return {error: true, message: msg};
    }
  }

  // Should not contain line formatting characters like \n.
  // Recall: Line formatting characters fall within the range
  // of character codes from 0 to 32
  for(let i = 0; i < 32; i ++){
    if((lp.indexOf(String.fromCodePoint(i)) > -1)) {
      msg = `email: cannot contain line formatting characters like \\n, \\t, etc`;
      return {error: true, message: msg};
    }
  }

  // Domain name should not contain consecutive dots
  let m = -1;
  for (let i = 0; i < dom.length; i++) {
    m = dom.indexOf('.', m + 1); // starts from index 0, and finds the next instance of '.' with every loop
    let n = m + 1; // n is index of the next character following the current dot
    if(domArr[m] === domArr[n]) {
      msg = `email: consecutive dots after @ is not allowed.`;
      return {error: true, message: msg};
    }
  }

   // domain name connot contain spaces
   if((dom.indexOf(' ') > -1)) {
    msg = `email: cannot contain spaces after @`;
    return {error: true, message: msg};
  }

  // domain should end with .com, .org, .net, ...
  if(!dotCom(str) && !dotOrg(str) && !dotNet(str)) {
    msg =  `email: domain name must end with '.com', '.org' or '.net'`;
    return {error: true, message: msg};
  }

  // leading dash in front of domain is invalid
  if(dom[0] === '-') {
    msg =  `email: leading dash in front of domain is invalid`;
    return {error: true, message: msg}
  }

  // Rejects special characters in the domain name except '.' and non-leading dash (-)
  for(let i = 0; i < dom.length; i++) {
    if(!isValidDomChar(dom[i], dom)) {
      msg = `email: special characters like " ${dom[i]} " is not allowed in the domain`;
      return {error: true, message: msg};
    }
  }
  
  // If an email passes all the tests above, then return this:
  return {error: false, message: 'email is valid'};
};


// RENDERING THE VIEWS
    const btn = document.getElementById('btn-submit');
    const textBox = document.getElementById('input-txtBox');
    const resultDiv = document.getElementById('div-result-area');

    // add event listener to the btn object
    btn.addEventListener('click', () => {
      const str = textBox.value;
      let result = verifyEmail(str);
     
      // Format the output differentyly when there is an error
      if (result.error) {
        resultDiv.innerHTML = `<p>error!</p>
                              <p>${result.message}</p>`;
        resultDiv.style.border = '1px solid red';
        resultDiv.style.color = 'red';
        // resultDiv.style.borderLeft = '1px solid red';
      } else {
        resultDiv.innerHTML = `<p>${result.message}</p>`;
        resultDiv.style.border = '1px solid green';
        resultDiv.style.color = 'green';
      }
    });

    // Clear the outputs as soon as the user changes the text input
    textBox.addEventListener('keydown', () => {
      resultDiv.innerHTML = '';
      resultDiv.style.border = '1px solid silver';
      // resultDiv.style.borderLeft = 'transparent';
    });






{// CONSOLE TESTS FOR THE verifyEmail() FUNCTION 
    console.log(verifyEmail('eneja\b@gmail.com'));
    console.log(verifyEmail(`''ene\nja.kc'@gmail.com'`));
    console.log(verifyEmail('eneja kc@gmail.com'));
    console.log(verifyEmail('eneja+kc@gmail.com'));
    console.log(verifyEmail('eneja@gmail@gmai.com'));
    console.log(verifyEmail('"eneja\\kc"@gmail.com'));
    console.log(verifyEmail('"ene@ja@kc"@gmail.com'))
    console.log(verifyEmail('"ene@ja@kc"ab@gmail.com'));
    console.log(verifyEmail('eneja<kc@gmail.com'));
    console.log(verifyEmail('"eneja<kc"@gmail.com'));
    console.log(verifyEmail('eneja.kc@exam..gmail.com'));
    console.log(verifyEmail('eneja.kc@ gmail.com'));
    console.log(verifyEmail('eneja.kc@gm ail.com'));
    console.log(verifyEmail('eneja.com@gmailuk.comma'));
    console.log(verifyEmail('eneja.kc@gmail.com..org'));
    console.log(verifyEmail('enejakc@..gmail.com'));
    console.log(verifyEmail('..ene.kc@gmail.com'));
    console.log(verifyEmail('en.ja..kc@gmail.com'));
    console.log(verifyEmail('" "@gmail.com'));
    console.log(verifyEmail('"ene ja.kc"@gmail.com'));
    console.log(verifyEmail('ene"ja"kc@gmail.com'));
    console.log(verifyEmail('.com'));
    console.log(verifyEmail('@gmail.com'));
    console.log(verifyEmail('eneja.kc@'));
    console.log(verifyEmail('eneja.kc@gmail.net'));
    console.log(verifyEmail('eneja.kc@-gmail.com'));
    console.log(verifyEmail('eneja.kc@gmail.net jon'));
    console.log(verifyEmail('eneja.kc@123.net'));
    console.log(verifyEmail('eneja.kc@12ab.net'));
    console.log(verifyEmail('eneja.kc@gma*il.com'));
    console.log('* = ', '*'.codePointAt(0));

    console.log(verifyEmail('enejakc@.gmail.com')); // is a leading dot allowed in the domain name ?
}

{// ROUGH WORK WHILE WORKING ON THIS PROJECT. YOU CAN LEARN A THING OR TWO BY LOOKING AT THEM

    // let dom = "gmail.com";
    // let i = dom.lastIndexOf('.com')
    // console.log(i);
    // console.log(dom[i+4] === undefined);



    // console.log(dotCom('eneja.kc@gmail.com.com'));
    // console.log(dotOrg('enealkdW@gmail.org'))

    // let test = "a..b..a..b..a..b";
    // console.log(test.indexOf('a', 7));
    // console.log(" ".codePointAt(0));
    // console.log(String.fromCodePoint(32));

    // for(let i = 0; i <= 33; i++) {
    //   console.log(String.fromCodePoint(i));
    // }

    // console.log('z'.codePointAt(0));
    // console.log('Z'.codePointAt(0));
    // console.log(String.fromCodePoint(123));
    // let chars = '';
    // let htmlChars = '';
    // for(let i = 0; i <= 122; i++) {
    //   chars += `${String.fromCodePoint(i)} = ${i} \n`;
    //   htmlChars += `${String.fromCodePoint(i)} = ${i} <br>`;
      
    // }
    // console.log(chars);
    // const resultDiv = document.getElementById('div-result-area');
    // resultDiv.innerHTML = htmlChars;

    // console.log(isValidDomChar('-', "gm*ail.com"));

    // let str = "my@string";
    // // let i be the index of '@', so i+1 will slice after '@'
    // let i = str.indexOf('@');
    // let dom = str.slice(i+1).split('');
    // let lp = str.slice(0, i);
    // console.log(dom);
    // console.log(str.slice(0, i));
    // console.log(str.indexOf('#'));
    // console.log(verifyEmail('eneja.kcgmail.com'));
    // console.log(verifyEmail('create a new table called users with the specified column(id, email, password, created_date and modified_date) definitions if it does not exist in the DB. The table requires only an email and password to make it simple. Youll notice that@gmail.com'));
    // console.log(verifyEmail('eneja.kc.@gmail.com'));
    // let maStr = "ab..c";
    // console.log(maStr.indexOf('.'));
    // console.log(verifyEmail('ab..c@gmail.com'));
    // let specialChars = `"(),:;<>@[\\]`.split('');
    // console.log(specialChars);
    // console.log(verifyEmail('enaja"kc@gmail.com'));
    // console.log('\\n', '\n', '\n'.codePointAt(0));
    // console.log('\\b', '\b', '\b'.codePointAt(0));
    // console.log('\\t', '\t', '\t'.codePointAt(0));
    // console.log('\\r', '\r', '\r'.codePointAt(0));
    // console.log('\\l', '\l', '\l'.codePointAt(0));
    // console.log('\\s', '\s', '\s'.codePointAt(0));
    // console.log(String.fromCodePoint(10));
    // console.log('\n' === String.fromCodePoint(10));
    // for(let i = 0; i <= 33; i++) {
    //   console.log(String.fromCodePoint(i));
    // }


    // // RENDERING THE VIEWS
    // const btn = document.getElementById('btn-submit');
    // const textBox = document.getElementById('input-txtBox');
    // const resultDiv = document.getElementById('div-result-area');

    // // add event listener to the btn object
    // btn.addEventListener('click', () => {
    //   const str = textBox.value;
    //   if (isNaN(Number(str))) {
    //     resultDiv.innerHTML = romToNum(str);
    //   } else {
    //     resultDiv.innerHTML = numToRom(Number(str));
    //   }
    //   // Format the output differentyly when there is an error
    //   if (error) {
    //     resultDiv.style.border = '1px solid red';
    //     // resultDiv.style.borderLeft = '1px solid red';
    //   } else {
    //     // resultDiv.style.borderLeft = '1px solid lightgreen';
    //     // resultDiv.style.borderBottom = '1px solid lightgreen';
    //   }
    // });

    // // Clear the outputs as soon as the user changes the text input
    // textBox.addEventListener('keydown', () => {
    //   resultDiv.innerHTML = '';
    //   resultDiv.style.border = '1px solid silver';
    //   // resultDiv.style.borderLeft = 'transparent';
    // });
}