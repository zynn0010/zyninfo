document.addEventListener('DOMContentLoaded', function () {
    const binaryRain = document.getElementById('binaryRain');
    const binaryChars = '01';
    let columns = Math.floor(window.innerWidth / 20);
    let rows = Math.floor(window.innerHeight / 24);

    function createBinaryRain() {
        let output = '';
        for (let r = 0; r < rows; r++) {
            let line = '';
            for (let c = 0; c < columns; c++) {
                line += binaryChars[Math.floor(Math.random() * binaryChars.length)];
            }
            output += line + '\n';
        }
        binaryRain.textContent = output;
    }

    createBinaryRain();

    let row = 0;
    const binaryInterval = setInterval(() => {
        const lines = binaryRain.textContent.split('\n');
        lines[row] = lines[row].split('').map(() =>
            binaryChars[Math.floor(Math.random() * binaryChars.length)]
        ).join('');
        binaryRain.textContent = lines.join('\n');
        row = (row + 1) % rows;
    }, 100);

    const card = document.querySelector('.hologram-card');

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2;

        const tiltX = (y / window.innerHeight) * 10;
        const tiltY = -(x / window.innerWidth) * 10;
        const depth = Math.sqrt(x * x + y * y) / 100;

        card.style.transform = `
            rotateX(${tiltX}deg) 
            rotateY(${tiltY}deg) 
            translateZ(${depth * 20}px)
        `;

        card.style.boxShadow = `
            ${x / 20}px ${y / 20}px 30px rgba(0,0,0,0.7),
            0 0 0 1px rgba(255,255,255,0.1)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
        card.style.boxShadow = `
            0 0 0 1px rgba(255,255,255,0.1),
            0 0 30px rgba(0,0,0,0.5)
        `;
    });

    const gridSize = 20;
    const gridOpacity = 0.03;

    function createGrid() {
        const grid = document.createElement('div');
        grid.style.position = 'absolute';
        grid.style.top = '0';
        grid.style.left = '0';
        grid.style.width = '100%';
        grid.style.height = '100%';
        grid.style.backgroundImage = `
            linear-gradient(rgba(255,255,255,${gridOpacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,${gridOpacity}) 1px, transparent 1px)
        `;
        grid.style.backgroundSize = `${gridSize}px ${gridSize}px`;
        grid.style.pointerEvents = 'none';
        card.appendChild(grid);
    }

    createGrid();

    window.addEventListener('resize', () => {
        columns = Math.floor(window.innerWidth / 20);
        rows = Math.floor(window.innerHeight / 24);
        createBinaryRain();
    });
});