import '../css/style.css';

document.addEventListener('DOMContentLoaded', function() {
  // Сохранение данных в LocalStorage
  const editableElements = document.querySelectorAll('[contenteditable="true"]');
  
  editableElements.forEach(el => {
    const storageKey = `resume_${el.tagName}_${el.parentNode.className}`;
    const savedContent = localStorage.getItem(storageKey);
    
    if (savedContent) {
      el.innerHTML = savedContent;
    }
    
    el.addEventListener('input', function() {
      localStorage.setItem(storageKey, el.innerHTML);
    });
  });

  // Обработчик кнопки скачивания PDF
  document.getElementById('download-btn').addEventListener('click', function() {
    // Здесь будет код для генерации PDF
    alert('Функция скачивания PDF будет реализована позже');
    
    // Для реальной реализации можно использовать библиотеку jsPDF:
    // const { jsPDF } = window.jspdf;
    // const doc = new jsPDF();
    // doc.text('Текст резюме', 10, 10);
    // doc.save('resume.pdf');
  });

  // Добавляем эффект ripple ко всем элементам с классом ripple
  document.querySelectorAll('.ripple').forEach(element => {
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${e.clientX - this.getBoundingClientRect().left}px`;
      ripple.style.top = `${e.clientY - this.getBoundingClientRect().top}px`;
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});
