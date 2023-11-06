document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; //активный элемент
  let flag = false; //состояние перемещения элемента
  let offsetX, offsetY; //смещение относительно курсора
  let startPosition = null; //исходная позиция элемента

  targets.forEach(target => {

    //обработчик события нажатия мыши
    target.addEventListener('mousedown', (e) => {
      if (e.button === 0) { //нажата левая кнопка мыши
          activeElement = target;
          startPosition = {
            left: target.style.left,
            top: target.style.top,
          };
          if (e.detail === 2) { //двойной клик  
            flag = true;
            activeElement.style.backgroundColor = 'green';
          }
          else {
            activeElement.style.backgroundColor = 'red';
          }
          offsetX = e.clientX - activeElement.getBoundingClientRect().left;
          offsetY = e.clientY - activeElement.getBoundingClientRect().top;
      }
    });
  });

  //обработчик события движения мыши
  document.addEventListener('mousemove', (e) => {
    if (activeElement) {
      activeElement.style.left = e.clientX - offsetX + 'px'; 
      activeElement.style.top = e.clientY - offsetY + 'px';
    }
  });

  //обработчик события отпускания мыши
  document.addEventListener('mouseup', () => {
    if (flag) {
      flag = false; //прерываем перетаскивание
    } else {
      activeElement = null; //сбрасываем активный элемент
    }
  });

  //обработчик события нажатия клавиши esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeElement) {
      flag = false; //прерываем перетаскивание
      activeElement.style.backgroundColor = 'red';
      activeElement.style.left = startPosition.left;
      activeElement.style.top = startPosition.top;
      activeElement = null; //сбрасываем активный элемент
    }
  });
});