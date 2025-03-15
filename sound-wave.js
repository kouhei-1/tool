let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer = null, cutBuffer = null;

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function() {
            audioContext.decodeAudioData(reader.result, function(buffer) {
                audioBuffer = buffer;
                drawWaveform(buffer, document.getElementById("fullWaveform"));
                updateCutWaveform();
            });
        };
    }
});

document.getElementById('startTime').addEventListener('input', updateCutWaveform);
document.getElementById('endTime').addEventListener('input', updateCutWaveform);

function updateCutWaveform() {
    if (!audioBuffer) return;

    const startTime = parseFloat(document.getElementById('startTime').value),
          endTime = parseFloat(document.getElementById('endTime').value);

    if (endTime <= startTime) return;

    const sampleRate = audioBuffer.sampleRate,
          startSample = Math.floor(startTime * sampleRate),
          endSample = Math.floor(endTime * sampleRate),
          cutData = audioBuffer.getChannelData(0).slice(startSample, endSample);

    cutBuffer = audioContext.createBuffer(1, cutData.length, sampleRate);
    cutBuffer.copyToChannel(cutData, 0);

    drawWaveform({ sampleRate, getChannelData: () => cutData }, document.getElementById("cutWaveform"));
}

function playCutAudio() {
    if (!cutBuffer) {
        alert("先にファイルを選択し、範囲を設定してください");
        return;
    }

    const source = audioContext.createBufferSource();
    source.buffer = cutBuffer;
    source.connect(audioContext.destination);
    source.start();
}

function drawWaveform(buffer, canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#1E1E1E";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width,
          height = canvas.height,
          data = buffer.getChannelData(0),
          step = Math.ceil(data.length / width),
          amp = height / 2;

    ctx.beginPath();
    ctx.moveTo(0, amp);

    for (let i = 0; i < width; i++) {
        const min = Math.min(...data.slice(i * step, (i + 1) * step)),
              max = Math.max(...data.slice(i * step, (i + 1) * step));

        ctx.lineTo(i, (1 - max) * amp);
        ctx.lineTo(i, (1 - min) * amp);
    }

    ctx.strokeStyle = "white";
    ctx.stroke();
}
