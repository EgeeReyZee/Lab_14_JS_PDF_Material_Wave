import '../css/style.css';
import { jsPDF } from "jspdf";

document.getElementById('download-btn').addEventListener('click', function() {
  const doc = new jsPDF();
  
  doc.setFontSize(22);
  doc.setTextColor(40, 53, 147);
  const firstName = document.getElementById('first-name').textContent;
  const lastName = document.getElementById('last-name').textContent;
  doc.text(`${firstName} ${lastName}`, 105, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  const position = document.querySelector('.position').textContent;
  doc.text(position, 105, 30, { align: 'center' });
  
  doc.setFontSize(12);
  const contacts = document.querySelector('.contact-info').textContent;
  const contactLines = contacts.split('\n').filter(line => line.trim());
  contactLines.forEach((line, index) => {
    doc.text(line.trim(), 105, 40 + (index * 7), { align: 'center' });
  });
  
  doc.setFontSize(18);
  doc.setTextColor(40, 53, 147);
  let yPosition = 70;
  
  document.querySelectorAll('.resume-section').forEach(section => {
    const title = section.querySelector('h2').textContent;
    const content = section.querySelector('.section-content').textContent;
    
    doc.text(title, 14, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 14, yPosition);
    yPosition += (lines.length * 7) + 15;
    
    doc.setFontSize(18);
    doc.setTextColor(40, 53, 147);
  });
  
  doc.save(`Резюме_${firstName}_${lastName}.pdf`);
});
document.addEventListener('DOMContentLoaded', function() {
  const protectedFields = ['first-name', 'last-name'];
  
  protectedFields.forEach(id => {
    const field = document.getElementById(id);
    const defaultValue = field.textContent;
    
    field.addEventListener('blur', function() {
      if (!this.textContent.trim()) {
        this.textContent = defaultValue;
      }
    });
  });

  const photoInput = document.getElementById('photo-input');
  const profilePhoto = document.getElementById('profile-photo');
  
  photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        profilePhoto.src = event.target.result;
        localStorage.setItem('profilePhoto', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  const savedPhoto = localStorage.getItem('profilePhoto');
  if (savedPhoto) {
    profilePhoto.src = savedPhoto;
  }

  const editableElements = document.querySelectorAll('[contenteditable="true"]');
  
  editableElements.forEach(el => {
    const storageKey = `resume_${el.id || el.className}`;
    const savedContent = localStorage.getItem(storageKey);
    
    if (savedContent) {
      el.innerHTML = savedContent;
    }
    
    el.addEventListener('input', function() {
      localStorage.setItem(storageKey, el.innerHTML);
    });
  });

  document.getElementById('download-btn').addEventListener('click', function() {
    alert('Функция скачивания PDF будет реализована в следующей версии');
  });

  document.querySelectorAll('.ripple').forEach(element => {
    element.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});
