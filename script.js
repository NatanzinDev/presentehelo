document.addEventListener('DOMContentLoaded', () => {
    // Lógica do botão de mensagem especial
    const specialMessageBtn = document.getElementById('specialMessageBtn');
    const specialMessage = document.getElementById('specialMessage');

    specialMessageBtn.addEventListener('click', () => {
        specialMessage.classList.remove('hidden');
        specialMessageBtn.style.display = 'none'; // Esconde o botão após clicar
    });

    // Lógica dos confetes
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiPieces = [];
    const numberOfPieces = 150;
    const colors = ['#fce4ec', '#ff80ab', '#d81b60', '#f8bbd0', '#ffffff'];

    function ConfettiPiece(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 4 + 2;
        this.dx = Math.random() * 2 - 1; // Movimento horizontal
        this.dy = Math.random() * 3 + 1; // Velocidade de queda
        this.opacity = 1;
        this.tilt = Math.random() * 10 - 5;
        this.tiltAngle = 0;
    }

    ConfettiPiece.prototype.draw = function() {
        ctx.beginPath();
        ctx.lineWidth = this.radius / 2;
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x + this.tilt + this.radius, this.y);
        ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.radius);
        ctx.stroke();
    };

    function createConfetti() {
        for (let i = 0; i < numberOfPieces; i++) {
            confettiPieces.push(new ConfettiPiece(
                Math.random() * canvas.width,
                -20, // Começa um pouco acima da tela
                colors[Math.floor(Math.random() * colors.length)]
            ));
        }
    }

    function updateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach((piece, index) => {
            piece.y += piece.dy;
            piece.x += piece.dx;
            piece.tiltAngle += 0.1;
            piece.tilt = Math.sin(piece.tiltAngle) * 12;

            if (piece.y > canvas.height) {
                // Reinicia o confete no topo
                piece.x = Math.random() * canvas.width;
                piece.y = -20;
            }
            
            piece.draw();
        });

        requestAnimationFrame(updateConfetti);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    createConfetti();
    updateConfetti();
});