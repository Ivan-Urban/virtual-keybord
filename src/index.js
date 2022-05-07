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
    'Ctrl', 'Win', 'Alt', '', 'Alt', '&#9668;', '&#9660;', '&#9658;', 'Ctrl',
  ],
  ru: [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650;', 'Shift',
    'Ctrl', 'Win', 'Alt', '', 'Alt', '&#9668;', '&#9660', '&#9658;', 'Ctrl',
  ],
};

const functionalKeys = ['keyBackspace', 'keyTab', 'keyDel', 'keyCapsLock', 'keyEnter', 'keyShift', 'key&#9650;', 'keyCtrl', 'keyAlt', 'keyWin', 'key&#9668;', 'key&#9660;', 'key&#9658;'];

const leng = 'en';

class Key {
  constructor(n) {
    this.key = document.createElement('div');
    this.key.classList.add('key');
    if (leng === 'en') {
      this.key.innerHTML = lengs.en[n];
      if (lengs.en[n] === '') {
        this.key.classList.add('keySpace');
      } else {
        this.key.classList.add(`key${[lengs.en[n]]}`);
      }
    } else {
      this.key.innerHTML = [lengs.ru[n]];
      if (lengs.en[n] === '') {
        this.key.classList.add('keySpace');
      } else {
        this.key.classList.add(`key${[lengs.en[n]]}`);
      }
    }
    if (functionalKeys.includes(this.key.classList[1])) {
      this.key.classList.add('functionalKey');
    }
    this.key.onmousedown = () => {
      this.onMouseDown();
    };
    this.key.onmouseup = () => {
      this.onMouseUp();
    };
  }

  appendKey(htmlElement) {
    htmlElement.append(this.key);
  }

  onMouseDown() {
    this.key.classList.add('active');
  }

  onMouseUp() {
    this.key.classList.remove('active');
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

// arrOfKeys[1].key.addEventListener('mousedown', () => {
//   arrOfKeys[1].key.classList.add('active');
// });

// arrOfKeys[1].key.addEventListener('mouseup', () => {
//   arrOfKeys[1].key.classList.remove('active');
// });
