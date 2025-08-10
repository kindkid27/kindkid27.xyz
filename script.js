document.addEventListener('DOMContentLoaded', function() {
    const cursorTrail = [];
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff9900', '#ff0099'];

    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        cursorTrail.push(trail);
    }

    let index = 0;
    document.addEventListener('mousemove', function(e) {
        const trail = cursorTrail[index];
        trail.style.left = (e.pageX - 10) + 'px';
        trail.style.top = (e.pageY - 10) + 'px';

        trail.style.opacity = '1';
        setTimeout(function() {
            trail.style.opacity = '0';
        }, 1000);

        index = (index + 1) % cursorTrail.length;
    });

    const audio = document.querySelector('audio');
    function attemptPlay() {
        audio.play().catch(e => {
            document.body.addEventListener('click', function once() {
                audio.play();
                document.body.removeEventListener('click', once);
            });
        });
    }

    attemptPlay();

    const cats = document.querySelectorAll('.cat');
    cats.forEach(cat => {
        cat.addEventListener('mouseenter', function() {
            this.style.animation = 'wobble 0.5s ease-in-out';
        });

        cat.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    fetch("https://raw.githubusercontent.com/kindkid27/Kindkid27/refs/heads/main/src/kindkid.xyz/marqueetext.txt")
    .then(response => response.text())
    .then(text => {
        const data = text.split(',').map(item => item.trim().replace(/^"|"$/g, ''));
        const marqueeelem = document.querySelector('#putlelonglisthereboy');
        if (marqueeelem) {
            const shuffled = data.sort(() => 0.5 - Math.random());
            marqueeelem.innerHTML = `✨ ${shuffled.join(' ✨ ')} ✨`;
        }
    })
    .catch(error => console.error("Error fetching marquee text:", error));
});

const style = document.createElement('style');
style.textContent = `
    @keyframes wobble {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        50% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
    }
`;
document.head.appendChild(style);
