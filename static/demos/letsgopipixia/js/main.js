
window.onload = function() {

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia =
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('你使用的浏览器不支持麦克风，请用按钮操作');
    }
    initPhaser();
}

function didntGetStream(e) {
    alert(e.name);
}


function gotStream(stream) {
    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
    support = true;

    // kick off the visual updating
    // initPhaser();
}

function initPhaser() {
    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', null, true);
    game.state.add('video', videoState);
    game.state.add('play', playState);
    game.state.add('menu', menuState);
    game.state.add('gameOver', gameOverState);
    game.state.add('gameComplete', gameCompleteState);

    game.state.start('video');
}
