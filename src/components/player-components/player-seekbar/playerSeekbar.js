export class PlayerSeekbar {
  constructor(video) {
    if (!video) {
      throw new Error('PlayerSeekbar: A valid HTMLVideoElement is required');
    }

    this.video = video;
    this.container = null;
    this.progress = null;
    this.buffer = null;
    this.thumb = null;
    this.tooltip = null;
    this.timeLabel = null;
    this.durationLabel = null;
    this.isDragging = false;
    this.focused = false;

    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'seekbar-container';

    this.buffer = document.createElement('div');
    this.buffer.className = 'seekbar-buffer';

    this.progress = document.createElement('div');
    this.progress.className = 'seekbar-progress';

    this.thumb = document.createElement('div');
    this.thumb.className = 'seekbar-thumb';
    this.thumb.tabIndex = 0; // Make thumb focusable

    this.tooltip = document.createElement('div');
    this.tooltip.className = 'seekbar-tooltip';
    this.tooltip.style.display = 'none';

    this.timeLabel = document.createElement('span');
    this.timeLabel.className = 'seekbar-time-label';
    this.durationLabel = document.createElement('span');
    this.durationLabel.className = 'seekbar-duration-label';

    this.container.appendChild(this.buffer);
    this.container.appendChild(this.progress);
    this.container.appendChild(this.thumb);
    this.container.appendChild(this.tooltip);
    this.container.appendChild(this.timeLabel);
    this.container.appendChild(this.durationLabel);

    // Update UI as video plays
    this.video.el_.ontimeupdate= () => this.update();
    this.video.el_.onprogress = () => this.updateBuffer();
    this.video.el_.ondurationchange = () => this.update();

    // Seek on click
    this.container.addEventListener('click', (e) => this.seek(e));
    // Dragging
    this.thumb.addEventListener('mousedown', (e) => this.startDrag(e));
    // Tooltip on hover
    this.container.addEventListener('mousemove', (e) => this.showTooltip(e));
    this.container.addEventListener('mouseleave', () => this.hideTooltip());

    // Focus/blur events for accessibility and visual feedback
    this.thumb.addEventListener('focus', () => {
      this.focused = true;
      this.thumb.classList.add('focused');
    });
    this.thumb.addEventListener('blur', () => {
      this.focused = false;
      this.thumb.classList.remove('focused');
    });

    // Add keydown event listeners for arrow keys to simulate dragging
    this.thumb.addEventListener('keydown', (e) => {
      const increment = 1; 
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        this.video.currentTime = Math.min(this.video.duration(), this.video.currentTime() + increment);
        this.update();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        this.video.currentTime = Math.max(0, this.video.currentTime - increment);
        this.update();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        if(this.video.paused()) {
          this.video.play(); // Resume playing the video
        }
      }
    });
  }

  focus() {
    if (this.thumb) {
      this.thumb.focus();
      this.thumb.classList.add('focused');
      this.focused = true;
    }
  }

  blur() {
    if (this.thumb) {
      this.thumb.blur();
      this.thumb.classList.remove('focused');
      this.focused = false;
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  update() {
    try{
      if (!this.video || !this.progress || !this.thumb || !this.timeLabel || !this.durationLabel) return;

    const percent = (this.video.currentTime() / this.video.duration()) * 100;
    this.progress.style.width = percent + '%';
    this.thumb.style.left = percent + '%';
    this.timeLabel.textContent = this.formatTime(this.video.currentTime());
    this.durationLabel.textContent = ' / ' + this.formatTime(this.video.duration());
    }catch(e){
    }
   
  }

  updateBuffer() {
    try{
        if (!this.video || !this.buffer) return;

    if (this.video?.buffered?.length) {
      const end = this.video.buffered.end(this.video.buffered.length - 1);
      const percent = (end / this.video.duration()) * 100;
      this.buffer.style.width = percent + '%';
    }
    }catch(e){
    }
   
  }

  seek(e) {
    try{
      if (this.isDragging || !this.container || !this.video) return;

    const rect = this.container.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    this.video.currentTime = percent * this.video.duration();
    }catch(e){
    }
   
  }

  startDrag(e) {
    if (!this.container || !this.video) return;

    e.preventDefault();
    this.isDragging = true;
    const onMove = (moveEvent) => {
      const rect = this.container.getBoundingClientRect();
      let percent = (moveEvent.clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(1, percent));
      this.progress.style.width = percent * 100 + '%';
      this.thumb.style.left = percent * 100 + '%';
      this.timeLabel.textContent = this.formatTime(percent * this.video.duration());
    };
    const onUp = (upEvent) => {
      const rect = this.container.getBoundingClientRect();
      let percent = (upEvent.clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(1, percent));
      this.video.currentTime = percent * this.video.duration;
      this.isDragging = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  showTooltip(e) {
    if (!this.container || !this.tooltip || !this.video) return;

    const rect = this.container.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * this.video.duration();
    this.tooltip.textContent = this.formatTime(time);
    this.tooltip.style.display = 'block';
    this.tooltip.style.left = `${percent * 100}%`;
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style.display = 'none';
    }
  }

  getElement() {
    return this.thumb;
  }

  mount(parent) {
    if (!parent || !(parent instanceof HTMLElement)) {
      throw new Error('PlayerSeekbar: parent must be a valid DOM element');
    }

    parent.appendChild(this.container);
    this.update();
    this.updateBuffer();
  }

  unmount() {
    if (!this.video || !this.container || !this.thumb) return;

    this.video.removeEventListener('timeupdate', this.update);
    this.video.removeEventListener('progress', this.updateBuffer);
    this.video.removeEventListener('durationchange', this.update);
    this.container.removeEventListener('click', this.seek);
    this.thumb.removeEventListener('mousedown', this.startDrag);
    this.container.removeEventListener('mousemove', this.showTooltip);
    this.container.removeEventListener('mouseleave', this.hideTooltip);
    this.thumb.removeEventListener('focus', this.focus);
    this.thumb.removeEventListener('blur', this.blur);
    this.thumb.removeEventListener('keydown', this.keydownHandler);

    if (this.container) {
      this.container.remove();
    }
  }
}
