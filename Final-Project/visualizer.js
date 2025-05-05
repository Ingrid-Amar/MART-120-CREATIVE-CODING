//Document Object Models
const canvas = document.getElementById('canvas');
const can = canvas.getContext('2d');
const togbtn = document.getElementById('toggle');
const audioselect = document.getElementById('audio-select');
const songtitle = document.getElementById('song-title');

//Canvas will fit window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Giving the varibles
let audiocontext;
let analyser;
let data;
let player = null;
let playing = false;

//making the flutter in the background
const flutter = [];
const numflutter = 75;

//makes random flutter on screen
for (let i = 0; i < numflutter; i++) {
    flutter.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    alpha: Math.random() * 0.5 + 0.5,
    alphaChange: (Math.random() * 0.01 + 0.003),
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4
    });
}
//draws the flutters on the screen
function drawflutter() {
    for (let f of flutter) {
        f.x += f.dx;
        f.y += f.dy;
        //hit the edges and move back to screen
        if (f.x < 0 || f.x > canvas.width) f.dx *= -1;
        if (f.y < 0 || f.y > canvas.height) f.dy *= -1;
        //makes them fade
        f.alpha += f.alphaChange;
        if (f.alpha < 0.2 || f.alpha > 1) f.alphaChange *= -1;
        //drawing them
        can.beginPath();
        can.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        can.fillStyle = `rgba(100, 150, 255, ${f.alpha})`;
        can.shadowColor = `rgba(100, 150, 255, ${f.alpha})`;
        can.fill();
    }
}
//listens to see when a song is selected
audioselect.addEventListener('change', function () {
    const selected = this.value;
    if (!selected) return;
    //makes the name visiable at the top of screen and plays it
    const songname = selected.replace('.mp3', '').replace(/([A-Z])/g, ' $1').trim();
    songtitle.textContent = `Now Playing: ${songname}`;
    playaudio(selected);
    });

//plays the song
function playaudio(audioFilename) {
    //stops song if paused
    if (player) {
        player.pause();
        playing = false;
        togbtn.textContent = 'Pause';
    }
    //changes the song if changed
    player = new Audio(audioFilename);
    document.body.appendChild(player);
    player.play();
    playing = true;
    //makes the analyser connect to the song
    audiocontext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audiocontext.createMediaElementSource(player);
    analyser = audiocontext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audiocontext.destination);
    //looks at the song frequency
    analyser.fftSize = 256;
    data = new Uint8Array(analyser.frequencyBinCount);
    //makes the animation to look pretty
    animate();
    }
//does the pause and go 
togbtn.addEventListener('click', () => {
    //can't pause without song
    if (!player) return;
    if (playing) {
        player.pause();
        playing = false;
        togbtn.textContent = 'Resume';
    } else {
        player.play();
        playing = true;
        togbtn.textContent = 'Pause';
    }
});
//makes the visulizer
function animate() {
    requestAnimationFrame(animate);

    // Dims the background
    can.fillStyle = 'rgba(0, 0, 0, 0.2)';
    can.fillRect(0, 0, canvas.width, canvas.height);
    //calls the flutters
    drawflutter(); 
    //makes it so that the visualizer doesn't do anything without the song
    if (!playing || !analyser || !data) return;
    analyser.getByteFrequencyData(data);
    //makes the circle in the middle of the canvas
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const maxradius = Math.min(x, y) - 10;
    const slicecount = data.length;
    const sliceangle = Math.PI * 2 / slicecount;
    //draws the lines out from the circle
    data.forEach((value, index) => {
        const angle = index * sliceangle;
        const radius = maxradius * (value / 256);
        //COLORS!!!!
        const neon = ['#C724B1', 
            '#4D4DFF', 
            '#E0E722', 
            '#FFAD00', 
            '#D22730',
            '#DB3EB1',
            '#44D62C',
        ];
        can.strokeStyle = neon[index % neon.length];
        can.lineWidth = 2;
        can.beginPath();
        can.arc(x, y, radius, angle, angle + sliceangle, false);
        can.stroke();
    });
}
//will resize the screen when needed
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});