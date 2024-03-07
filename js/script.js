const overlay = document.getElementById('overlay');
const textElement = document.getElementById('text');

overlay.addEventListener('mouseenter', () => {
    overlay.classList.add('active');
});

overlay.addEventListener('mouseleave', () => {
    overlay.classList.remove('active');
});

function moveCursor(event) {
    const cursorText = "/// MISSION ->";

    let cursorTextElement = document.querySelector('.custom-cursor-text');
    if (!cursorTextElement) {
        cursorTextElement = document.createElement('div');
        cursorTextElement.classList.add('custom-cursor-text');
        cursorTextElement.textContent = cursorText;
        document.body.appendChild(cursorTextElement);
    }

    cursorTextElement.style.display = "block"; // Показываем текст курсора

    // Выполняем задержку перед изменением позиции
    setTimeout(() => {
        cursorTextElement.style.opacity = "1"; // Плавное появление текста
        cursorTextElement.style.left = `${event.clientX + 10}px`; // Добавляем 10px для смещения текста вправо от курсора
        cursorTextElement.style.top = `${event.clientY - 20}px`; // Отнимаем 20px для смещения текста вверх от курсора
    }, 50); // Задержка в 50 миллисекунд
}

function hideCursorText() {
    const cursorTextElement = document.querySelector('.custom-cursor-text');
    if (cursorTextElement) {
        cursorTextElement.style.opacity = "0"; // Плавное исчезновение текста
        setTimeout(() => {
            cursorTextElement.style.display = "none"; // Скрываем текст курсора после окончания анимации
        }, 300); // Задержка в 300 миллисекунд (соответствует времени анимации)
    }
}

// forEach method
var forEach = function(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  };
  
  var spinner = document.querySelector("#spinner"),
    angle = 0,
    images = document.querySelectorAll("#spinner figure"),
    numpics = images.length,
    degInt = 360 / numpics,
    start = 0,
    current = 1;
  
  forEach(images, function(index, value) {
    images[index].style.webkitTransform = "rotateY(-" + start + "deg)";
    images[index].style.transform = "rotateY(-" + start + "deg)";
    images[index].addEventListener("click", function() {
      if (this.classList.contains('current')) {
        this.classList.toggle("focus");
      }
    })
    start = start + degInt;
  });
  
  function setCurrent(current) {
    document.querySelector('figure#spinner figure:nth-child(' + current + ')').classList.add('current');
  }
  
  function galleryspin(sign) {
    forEach(images, function(index, value) {
      images[index].classList.remove('current');
      images[index].classList.remove('focus');
      images[index].classList.remove('caption');
    })
  
    if (!sign) {
      angle = angle + degInt;
      current = (current + 1);
      if (current > numpics) {
        current = 1;
      }
    } else {
      angle = angle - degInt;
      current = current - 1;
      if (current == 0) {
        current = numpics;
      }
    }
  
    spinner.setAttribute("style", "-webkit-transform: rotateY(" + angle + "deg); transform: rotateY(" + angle + "deg)");
    setCurrent(current);
  }
  
  document.body.onkeydown = function(e) {
    switch (e.which) {
      case 37: // left cursor
        galleryspin('-');
        break;
  
      case 39: // right cursor
        galleryspin('');
        break;
  
      case 90: // Z - zoom image in forefront image
        document.querySelector('figure#spinner figure.current').classList.toggle('focus');
        break;
  
      case 67: // C - show caption for forefront image
        document.querySelector('figure#spinner figure.current').classList.toggle('caption');
        break;
  
      default:
        return; // exit this handler for other keys
    }
    e.preventDefault();
  }
  
  function mouseMove() {
    
  }
  
  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove, false);
    document.removeEventListener("mouseup", mouseUp, false);
  }
  
  spinner.addEventListener("mousedown", function(e) {
    var startX = e.pageX;
    
    document.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("mouseup", mouseUp, false);
  }, false);
  
  setCurrent(1);


function calculateSize() {
    // Получаем значения ширины и длины из полей ввода
    const width = parseInt(document.getElementById('width').value);
    const length = parseInt(document.getElementById('length').value);
    const resultElement = document.getElementById('result');

    // Проверяем, что введенные значения являются числами
    if (isNaN(width) || isNaN(length)) {
        resultElement.textContent = "please enter numeric values for width and length.";
        return;
    }

    // Проверяем размеры и выводим результат
    if (width >= 0 && width <= 48 && length >= 0 && length <= 69) {
        resultElement.textContent = "this size is not available :-(";
    } else if (width >= 49 && width <= 53 && length >= 70 && length <= 71) {
        resultElement.textContent = "your size is M";
    } else if (width >= 54 && width <= 56 && length >= 72 && length <= 74) {
        resultElement.textContent = "your size is L";
    } else if (width >= 57 && width <= 60 && length >= 76 && length <= 78) {
        resultElement.textContent = "your size is XL";
    } else {
        resultElement.textContent = "this size is not available :-(";
    }
}

window.addEventListener('scroll', function() {
  var header = document.querySelector('.header');
  var scrolled = window.scrollY > 0;
  header.classList.toggle('scrolled', scrolled);
});

/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel2-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)


const indexes = document.querySelectorAll('.indexes li');
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

function reset() {
  for (let i = 0; i < tabs.length; i++) {
    indexes[i].style.borderColor = 'transparent';
    tabs[i].style.zIndex = 0;
    tabs[i].classList.remove('active');
    contents[i].classList.remove('active');
  }
}

function showTab(i) {
  indexes[i].style.borderColor = 'rgba(211,38,38,0.6)';
  tabs[i].style.opacity = 1;
  tabs[i].style.zIndex = 5;
  tabs[i].classList.add('active');
  contents[i].classList.add('active');
}

function activate(e) {
  if (!e.target.matches('.indexes li')) return;
  reset();
  showTab(e.target.dataset.index);
}

const init = () => showTab(0);

window.addEventListener('load',init,false);
window.addEventListener('click',activate,false);

function changePositionAndVisibility() {
  // Получаем элемент с картинкой
  const image = document.querySelector('.about-clo::before');
  // Проверяем, что элемент существует
  if (image) {
    // Генерируем случайные координаты для новой позиции картинки
    const newPositionX = Math.random() * (window.innerWidth - 50);
    const newPositionY = Math.random() * (window.innerHeight - 50);
    // Плавно перемещаем картинку
    image.style.transition = 'transform 2s ease-out';
    image.style.transform = `translate(${newPositionX}px, ${newPositionY}px)`;
    // Плавно изменяем видимость картинки
    setTimeout(() => {
      image.style.transition = 'opacity 2s ease';
      image.style.opacity = '0';
      // Через 2 секунды после исчезновения картинки меняем ее позицию и повторяем процесс
      setTimeout(() => {
        changePositionAndVisibility();
      }, 2000);
    }, 2000);
    // Устанавливаем задержку для вызова следующей функции
    setTimeout(() => {
      // Сбрасываем позицию и прозрачность картинки перед ее появлением
      image.style.transition = 'none';
      image.style.transform = `translate(0px, 0px)`;
      image.style.opacity = '1';
    }, 4000);
  }
}
// Вызываем функцию первый раз, чтобы начать процесс
changePositionAndVisibility();

window.onload = function() {
  setTimeout(function() {
    var loader = document.querySelector('.preloader-container');
    loader.classList.add("active_new");
  //  $('.preloader').addClass('active');
    // Display your page content after preloader animation completes
   // document.body.style.overflow = 'auto'; // Restore scrolling
  }, 8000); // Adjust the duration as needed

  // Apply animations to each span element with a delay
  const spans = document.querySelectorAll('.preloader-text span');
  spans.forEach((span, index) => {
    setTimeout(() => {
      span.style.opacity = '1';
      span.style.animation = ' expandWidth 10s forwards, fadeOut 5s forwards'; // Add fade-out animation
    }, index * 300); // Adjust the delay between each letter's animation
  });
};
