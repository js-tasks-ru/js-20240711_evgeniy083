export default class NotificationMessage {

  constructor(message, { duration = 1000, type = 'success' } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    
    this.element = this.createElement();
  }
    
  createElement() {
    const element = document.createElement('div');
    element.classList.add('notification');
    element.classList.add(this.type);
    element.textContent = this.message;
    
    return element;
  }
    
  show(container = document.body) {
    container.append(this.element);
    
    setTimeout(() => {
      this.remove();
    }, this.duration);
  }
    
  remove() {
    this.element.remove();
  }
    
  destroy() {
    this.remove();
  }
}
