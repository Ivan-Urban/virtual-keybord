const title = document.createElement('span');
title.textContent = 'Виртуальная клавиатура';
title.classList.add('title');
document.body.append(title);

const input = document.createElement('textarea');
input.classList.add('textarea');
document.body.append(input);

const keybordCase = document.createElement('div');
keybordCase.classList.add('keybord-case');
document.body.append(keybordCase);

const lengs = {
  en: [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650;', 'Shift',
    'Ctrl', 'Win', 'Alt', '&#8194;', 'Alt', '&#9668;', '&#9660;', '&#9658;', 'Ctrl',
  ],
  ru: [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650;', 'Shift',
    'Ctrl', 'Win', 'Alt', '&#8194;', 'Alt', '&#9668;', '&#9660', '&#9658;', 'Ctrl',
  ],
};

const letters = [
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
  'z', 'x', 'c', 'v', 'b', 'n', 'm',
  'ё', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
  'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
  'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю',
];

let checkLettersSize = 'small';

const functionalKeys = ['keyBackspace', 'keyTab', 'keyDel', 'keyCapsLock', 'keyEnter', 'keyShift', 'key&#9650;', 'keyCtrl', 'keyAlt', 'keyWin', 'key&#9668;', 'key&#9660;', 'key&#9658;'];

let leng = 'en';

class Key {
  constructor(n) {
    this.key = document.createElement('div');
    this.key.classList.add('key');
    // if (leng === 'en') {
    this.key.innerHTML = lengs[leng][n];
    if (lengs.en[n] === '&#8194;') {
      this.key.classList.add('keySpace');
    } else {
      this.key.classList.add(`key${[lengs.en[n]]}`);
    }
    // } else {
    //   this.key.innerHTML = lengs.ru[n];
    //   if (lengs.en[n] === '&#8194;') {
    //     this.key.classList.add('keySpace');
    //   } else {
    //     this.key.classList.add(`key${[lengs.en[n]]}`);
    //   }
    // }
    if (functionalKeys.includes(this.key.classList[1])) {
      this.key.classList.add('functionalKey');
    }
    // this.key.onmousedown = () => {
    //   this.onMouseDown();
    // };
    // this.key.onmouseup = () => {
    //   this.onMouseUp();
    // };
  }

  appendKey(htmlElement) {
    htmlElement.append(this.key);
  }

  upper() {
    this.key.innerHTML = this.key.innerHTML.toUpperCase();
  }

  lower() {
    this.key.innerHTML = this.key.innerHTML.toLowerCase();
  }

  onMouseDown() {
    this.key.classList.add('active');
    let textCorsorPosition = input.selectionStart;
    const spaceText = '      ';
    const lineBreak = '\n';
    if (!functionalKeys.includes(this.key.classList[1])) {
      textCorsorPosition = input.selectionStart;
      input.value = input.value.slice(0, input.selectionStart) + this.key.innerHTML
      + input.value.slice(input.selectionStart, input.value.length);
      input.setSelectionRange(textCorsorPosition + 1, textCorsorPosition + 1);
    } else {
      switch (this.key.classList[1]) {
        case 'keyBackspace':
          textCorsorPosition = input.selectionStart;
          if (textCorsorPosition !== 0) {
            input.value = input.value.slice(0, input.selectionStart - 1)
          + input.value.slice(input.selectionStart, input.value.length);
            input.setSelectionRange(textCorsorPosition - 1, textCorsorPosition - 1);
          }
          break;
        case 'keyTab':
          textCorsorPosition = input.selectionStart;
          input.value = input.value.slice(0, input.selectionStart) + spaceText
          + input.value.slice(input.selectionStart, input.value.length);
          input.setSelectionRange(textCorsorPosition + 6, textCorsorPosition + 6);
          break;
        case 'keyDel':
          textCorsorPosition = input.selectionStart;
          input.value = input.value.slice(0, input.selectionStart)
          + input.value.slice(input.selectionStart + 1, input.value.length);
          input.setSelectionRange(textCorsorPosition, textCorsorPosition);
          break;
        case 'keyEnter':
          textCorsorPosition = input.selectionStart;
          input.value = input.value.slice(0, input.selectionStart) + lineBreak
          + input.value.slice(input.selectionStart, input.value.length);
          input.setSelectionRange(textCorsorPosition + 1, textCorsorPosition + 1);
          break;
        case 'key&#9650;':
          input.setSelectionRange(0, 0);
          break;
        case 'key&#9668;':
          if (input.selectionStart !== 0) {
            input.setSelectionRange(input.selectionStart - 1, input.selectionStart - 1);
          }
          break;
        case 'key&#9660;':
          input.setSelectionRange(input.value.length, input.value.length);
          break;
        case 'key&#9658;':
          input.setSelectionRange(input.selectionStart + 1, input.selectionStart + 1);
          break;
        default:
          break;
      }
    }
  }

  onMouseUp() {
    this.key.classList.remove('active');
    input.focus();
  }
}

const arrOfRows = [];

for (let i = 0; i < 5; i += 1) {
  arrOfRows[i] = document.createElement('div');
  arrOfRows[i].classList.add('row');
  keybordCase.append(arrOfRows[i]);
}

const arrOfKeys = [];

for (let j = 0; j < 64; j += 1) {
  arrOfKeys[j] = new Key(j);
}

for (let i = 0; i < 5; i += 1) {
  switch (i) {
    case 0:
      for (let k = 0; k < 14; k += 1) {
        arrOfKeys[k].appendKey(arrOfRows[i]);
      }
      break;
    case 1:
      for (let k = 14; k < 29; k += 1) {
        arrOfKeys[k].appendKey(arrOfRows[i]);
      }
      break;
    case 2:
      for (let k = 29; k < 42; k += 1) {
        arrOfKeys[k].appendKey(arrOfRows[i]);
      }
      break;
    case 3:
      for (let k = 42; k < 55; k += 1) {
        arrOfKeys[k].appendKey(arrOfRows[i]);
      }
      break;
    case 4:
      for (let k = 55; k < 64; k += 1) {
        arrOfKeys[k].appendKey(arrOfRows[i]);
      }
      break;
    default:
      break;
  }
}

function changeLettersSize() {
  arrOfKeys.forEach((el) => {
    if (letters.includes(el.key.innerHTML.toLowerCase())) {
      if (checkLettersSize === 'small') {
        el.upper();
      } else {
        el.lower();
      }
    }
  });
  if (checkLettersSize === 'small') {
    checkLettersSize = 'big';
  } else {
    checkLettersSize = 'small';
  }
}

document.querySelector('.keyCapsLock').onmousedown = () => {
  document.querySelector('.keyCapsLock').classList.add('active');
  changeLettersSize();
};

keybordCase.onmousedown = (event) => {
  arrOfKeys.forEach((el) => {
    if (el.key === event.target) {
      el.onMouseDown();
    }
  });
};

keybordCase.onmouseup = () => {
  arrOfKeys.forEach((el) => {
    el.onMouseUp();
  });
};

const shifts = document.querySelectorAll('.keyShift');

shifts.forEach((el) => {
  el.addEventListener('mousedown', () => {
    changeLettersSize();
  });
});

shifts.forEach((el) => {
  el.addEventListener('mouseup', () => {
    changeLettersSize();
  });
});

const ctrls = document.querySelectorAll('.keyCtrl');
const alts = document.querySelectorAll('.reyAlt');

let ctrlCheck = false;
let altCheck = false;

function changeLanguage() {
  for (let i = 0; i < 64; i += 1) {
    arrOfKeys[i].key.innerHTML = lengs[leng][i];
  }
}

ctrls.forEach((el) => {
  el.addEventListener('mousedown', () => {
    ctrlCheck = true;
    if (ctrlCheck && altCheck) {
      if (leng === 'en') {
        leng = 'ru';
      } else {
        leng = 'en';
      }
      changeLanguage();
    }
  });
});

ctrls.forEach((el) => {
  el.addEventListener('mouseup', () => {
    ctrlCheck = false;
  });
});

alts.forEach((el) => {
  el.addEventListener('mousedown', () => {
    altCheck = true;
    if (ctrlCheck && altCheck) {
      if (leng === 'en') {
        leng = 'ru';
      } else {
        leng = 'en';
      }
      changeLanguage();
    }
  });
});

alts.forEach((el) => {
  el.addEventListener('mouseup', () => {
    altCheck = false;
  });
});
