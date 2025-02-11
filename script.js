const startButton = document.getElementById('startButton');
const switchButton = document.getElementById('switchButton');
const videoElement = document.getElementById('video');
let currentStream;
let currentDeviceId = 'environment'; // Başlangıçta arka kamera

startButton.addEventListener('click', function () {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        startCamera(currentDeviceId);
    } else {
        alert("Tarayıcınız kamera desteği sağlamıyor.");
    }
});

switchButton.addEventListener('click', function () {
    currentDeviceId = currentDeviceId === 'environment' ? 'user' : 'environment'; // Kamerayı değiştir
    startCamera(currentDeviceId);
});

function startCamera(deviceId) {
    // Kamera izni al ve kamerayı başlat
    navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            const selectedDevice = videoDevices.find(device => device.label.toLowerCase().includes(deviceId));
            
            if (selectedDevice) {
                navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedDevice.deviceId } })
                    .then(function (stream) {
                        if (currentStream) {
                            currentStream.getTracks().forEach(track => track.stop()); // Önceki akışı durdur
                        }
                        currentStream = stream;
                        videoElement.srcObject = stream;
                        startButton.style.display = 'none'; // Kamerayı açtıktan sonra butonu gizle
                        switchButton.style.display = 'block'; // Switch butonunu göster
                    })
                    .catch(function (error) {
                        alert("Kamera erişimi reddedildi veya bir hata oluştu.");
                    });
            }
        });
}
