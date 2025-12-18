/**
 * Elsakr CSS Gradient Generator
 * Create beautiful CSS gradients with live preview
 */

class GradientGenerator {
    constructor() {
        this.gradientType = 'linear';
        this.angle = 90;
        this.colorStops = [
            { color: '#667eea', position: 0 },
            { color: '#764ba2', position: 100 }
        ];
        this.codeFormat = 'css';
        
        this.presets = [
            { colors: ['#667eea', '#764ba2'], name: 'Purple Dream' },
            { colors: ['#f093fb', '#f5576c'], name: 'Pink Sunset' },
            { colors: ['#4facfe', '#00f2fe'], name: 'Ocean Blue' },
            { colors: ['#43e97b', '#38f9d7'], name: 'Fresh Mint' },
            { colors: ['#fa709a', '#fee140'], name: 'Warm Flame' },
            { colors: ['#a18cd1', '#fbc2eb'], name: 'Lavender' },
            { colors: ['#ff0844', '#ffb199'], name: 'Coral' },
            { colors: ['#00c6fb', '#005bea'], name: 'Sky Blue' },
            { colors: ['#f83600', '#f9d423'], name: 'Orange Fire' },
            { colors: ['#667eea', '#764ba2', '#f093fb'], name: 'Triple' }
        ];
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.bindEvents();
        this.renderColorStops();
        this.renderPresets();
        this.updatePreview();
        this.updateCode();
    }
    
    cacheElements() {
        this.gradientPreview = document.getElementById('gradientPreview');
        this.codeOutput = document.getElementById('codeOutput');
        this.angleSlider = document.getElementById('angleSlider');
        this.angleValue = document.getElementById('angleValue');
        this.angleControl = document.getElementById('angleControl');
        this.colorStopsContainer = document.getElementById('colorStops');
        this.presetsContainer = document.getElementById('presets');
        this.addColorBtn = document.getElementById('addColorBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.randomBtn = document.getElementById('randomBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.gradientTypeBtns = document.querySelectorAll('.gradient-type-btn');
        this.codeTabBtns = document.querySelectorAll('.code-tab-btn');
    }
    
    bindEvents() {
        // Gradient type buttons
        this.gradientTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setGradientType(btn.dataset.type));
        });
        
        // Angle slider
        this.angleSlider.addEventListener('input', (e) => {
            this.angle = parseInt(e.target.value);
            this.angleValue.textContent = `${this.angle}°`;
            this.updatePreview();
            this.updateCode();
        });
        
        // Add color button
        this.addColorBtn.addEventListener('click', () => this.addColorStop());
        
        // Copy button
        this.copyBtn.addEventListener('click', () => this.copyCode());
        
        // Random button
        this.randomBtn.addEventListener('click', () => this.generateRandom());
        
        // Reset button
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Code format tabs
        this.codeTabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setCodeFormat(btn.dataset.format));
        });
    }
    
    setGradientType(type) {
        this.gradientType = type;
        
        // Update button styles
        this.gradientTypeBtns.forEach(btn => {
            if (btn.dataset.type === type) {
                btn.classList.add('bg-blue-500', 'text-white');
                btn.classList.remove('bg-dark-input', 'text-slate-400');
            } else {
                btn.classList.remove('bg-blue-500', 'text-white');
                btn.classList.add('bg-dark-input', 'text-slate-400');
            }
        });
        
        // Show/hide angle control
        if (type === 'linear') {
            this.angleControl.style.display = 'block';
        } else {
            this.angleControl.style.display = 'none';
        }
        
        this.updatePreview();
        this.updateCode();
    }
    
    setCodeFormat(format) {
        this.codeFormat = format;
        
        // Update tab styles
        this.codeTabBtns.forEach(btn => {
            if (btn.dataset.format === format) {
                btn.classList.add('bg-blue-500', 'text-white');
                btn.classList.remove('bg-dark-input', 'text-slate-400');
            } else {
                btn.classList.remove('bg-blue-500', 'text-white');
                btn.classList.add('bg-dark-input', 'text-slate-400');
            }
        });
        
        this.updateCode();
    }
    
    addColorStop() {
        const lastColor = this.colorStops[this.colorStops.length - 1];
        const newPosition = Math.min(lastColor.position + 25, 100);
        const newColor = this.getRandomColor();
        
        this.colorStops.push({ color: newColor, position: newPosition });
        this.renderColorStops();
        this.updatePreview();
        this.updateCode();
    }
    
    removeColorStop(index) {
        if (this.colorStops.length > 2) {
            this.colorStops.splice(index, 1);
            this.renderColorStops();
            this.updatePreview();
            this.updateCode();
        }
    }
    
    updateColorStop(index, color, position) {
        this.colorStops[index] = { color, position };
        this.updatePreview();
        this.updateCode();
    }
    
    renderColorStops() {
        this.colorStopsContainer.innerHTML = '';
        
        this.colorStops.forEach((stop, index) => {
            const div = document.createElement('div');
            div.className = 'color-stop flex items-center gap-3';
            
            div.innerHTML = `
                <input type="color" value="${stop.color}" class="color-picker" data-index="${index}">
                <input type="text" value="${stop.color}" class="color-hex flex-1 px-3 py-2 bg-dark-input border border-white/10 rounded-lg text-sm text-white uppercase" data-index="${index}" maxlength="7">
                <div class="flex items-center gap-2 flex-1">
                    <input type="range" min="0" max="100" value="${stop.position}" class="position-slider flex-1" data-index="${index}">
                    <span class="text-xs text-slate-400 w-8">${stop.position}%</span>
                </div>
                <button class="remove-btn w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition-all ${this.colorStops.length <= 2 ? 'opacity-30 cursor-not-allowed' : ''}" data-index="${index}" ${this.colorStops.length <= 2 ? 'disabled' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            `;
            
            // Bind events
            const colorPicker = div.querySelector('.color-picker');
            const colorHex = div.querySelector('.color-hex');
            const positionSlider = div.querySelector('.position-slider');
            const removeBtn = div.querySelector('.remove-btn');
            
            colorPicker.addEventListener('input', (e) => {
                colorHex.value = e.target.value;
                this.updateColorStop(index, e.target.value, stop.position);
            });
            
            colorHex.addEventListener('input', (e) => {
                let value = e.target.value;
                if (!value.startsWith('#')) value = '#' + value;
                if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                    colorPicker.value = value;
                    this.updateColorStop(index, value, stop.position);
                }
            });
            
            positionSlider.addEventListener('input', (e) => {
                const position = parseInt(e.target.value);
                div.querySelector('.text-xs').textContent = `${position}%`;
                this.updateColorStop(index, stop.color, position);
            });
            
            removeBtn.addEventListener('click', () => this.removeColorStop(index));
            
            this.colorStopsContainer.appendChild(div);
        });
    }
    
    renderPresets() {
        this.presetsContainer.innerHTML = '';
        
        this.presets.forEach((preset, index) => {
            const btn = document.createElement('button');
            btn.className = 'w-full aspect-square rounded-lg border-2 border-transparent hover:border-blue-500 transition-all';
            btn.style.background = `linear-gradient(135deg, ${preset.colors.join(', ')})`;
            btn.title = preset.name;
            
            btn.addEventListener('click', () => this.applyPreset(preset));
            
            this.presetsContainer.appendChild(btn);
        });
    }
    
    applyPreset(preset) {
        this.colorStops = preset.colors.map((color, i) => ({
            color,
            position: Math.round((i / (preset.colors.length - 1)) * 100)
        }));
        
        this.renderColorStops();
        this.updatePreview();
        this.updateCode();
    }
    
    updatePreview() {
        const gradient = this.generateGradientCSS();
        this.gradientPreview.style.background = gradient;
    }
    
    generateGradientCSS() {
        const stops = this.colorStops
            .sort((a, b) => a.position - b.position)
            .map(s => `${s.color} ${s.position}%`)
            .join(', ');
        
        switch (this.gradientType) {
            case 'linear':
                return `linear-gradient(${this.angle}deg, ${stops})`;
            case 'radial':
                return `radial-gradient(circle, ${stops})`;
            case 'conic':
                return `conic-gradient(from ${this.angle}deg, ${stops})`;
            default:
                return `linear-gradient(${this.angle}deg, ${stops})`;
        }
    }
    
    updateCode() {
        const gradient = this.generateGradientCSS();
        let code = '';
        
        switch (this.codeFormat) {
            case 'css':
                code = `background: ${gradient};`;
                break;
            case 'tailwind':
                code = this.generateTailwindCode();
                break;
            case 'scss':
                code = this.generateSCSSCode();
                break;
        }
        
        this.codeOutput.textContent = code;
    }
    
    generateTailwindCode() {
        // Tailwind doesn't support arbitrary gradients well
        // So we'll output the CSS class approach
        const gradient = this.generateGradientCSS();
        return `/* Add to your CSS or use arbitrary values */
.gradient-custom {
  background: ${gradient};
}

/* Or use inline style */
style="background: ${gradient}"`;
    }
    
    generateSCSSCode() {
        const stops = this.colorStops
            .sort((a, b) => a.position - b.position)
            .map(s => `${s.color} ${s.position}%`)
            .join(',\n    ');
        
        let gradientFunc = '';
        switch (this.gradientType) {
            case 'linear':
                gradientFunc = `linear-gradient(\n    ${this.angle}deg,\n    ${stops}\n  )`;
                break;
            case 'radial':
                gradientFunc = `radial-gradient(\n    circle,\n    ${stops}\n  )`;
                break;
            case 'conic':
                gradientFunc = `conic-gradient(\n    from ${this.angle}deg,\n    ${stops}\n  )`;
                break;
        }
        
        return `$gradient: ${gradientFunc};

.element {
  background: $gradient;
}`;
    }
    
    copyCode() {
        const code = this.codeOutput.textContent;
        navigator.clipboard.writeText(code).then(() => {
            const originalText = this.copyBtn.innerHTML;
            this.copyBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Copied!
            `;
            this.copyBtn.classList.add('bg-emerald-500');
            this.copyBtn.classList.remove('bg-blue-500');
            
            setTimeout(() => {
                this.copyBtn.innerHTML = originalText;
                this.copyBtn.classList.remove('bg-emerald-500');
                this.copyBtn.classList.add('bg-blue-500');
            }, 2000);
        });
    }
    
    generateRandom() {
        const numColors = Math.floor(Math.random() * 3) + 2; // 2-4 colors
        this.colorStops = [];
        
        for (let i = 0; i < numColors; i++) {
            this.colorStops.push({
                color: this.getRandomColor(),
                position: Math.round((i / (numColors - 1)) * 100)
            });
        }
        
        this.angle = Math.floor(Math.random() * 360);
        this.angleSlider.value = this.angle;
        this.angleValue.textContent = `${this.angle}°`;
        
        this.renderColorStops();
        this.updatePreview();
        this.updateCode();
    }
    
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    reset() {
        this.gradientType = 'linear';
        this.angle = 90;
        this.colorStops = [
            { color: '#667eea', position: 0 },
            { color: '#764ba2', position: 100 }
        ];
        
        this.angleSlider.value = 90;
        this.angleValue.textContent = '90°';
        this.setGradientType('linear');
        this.renderColorStops();
        this.updatePreview();
        this.updateCode();
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new GradientGenerator();
});
