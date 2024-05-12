document.addEventListener('DOMContentLoaded', function() {
    // TextScramble
    class TextScramble {
      constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
      }
      setText(newText) {
        const oldText = this.el.innerText || '';
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || '';
          const to = newText[i] || '';
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }
      update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!this.queue[i].char || Math.random() < 0.28) {
              this.queue[i].char = this.randomChar();
            }
            output += `<span class="dud">${this.queue[i].char}</span>`;
          } else {
            output += from;
          }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }
      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }
  
    // Example
    const phrases = ['PHYSICAL', 'COMPUTING'];
  
    const el = document.querySelector('.text');
    const fx = new TextScramble(el);
  
    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 800);
      });
      counter = (counter + 1) % phrases.length;
    };
  
    next();
  });