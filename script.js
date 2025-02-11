const switchButton = document.getElementById('switchButton');
const captureButton = document.getElementById('captureButton');
const downloadLink = document.getElementById('downloadLink');
const videoElement = document.getElementById('video');
let currentStream;
let currentDeviceId = 'environment'; // Başlangıçta arka kamera
let currentPhoto;

switchButton.addEventListener('click', function () {
    currentDeviceId = currentDeviceId === 'environment' ? 'user' : 'environment'; // Kamerayı değiştir
    startCamera(currentDeviceId);
});

captureButton.addEventListener('click', function () {
    capturePhoto();
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
                    })
                    .catch(function (error) {
                        alert("Kamera erişimi reddedildi veya bir hata oluştu.");
                    });
            }
        });
}

function capturePhoto() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Video boyutlarına göre canvas boyutunu ayarlıyoruz
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    // Videodan resmi alıyoruz
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    // Fotoğrafı base64 formatında elde ediyoruz
    const photoData = canvas.toDataURL('image/png');
    
    // Fotoğrafı kaydetmek için indirme linkini oluşturuyoruz
    currentPhoto = photoData;
    const imageUrl = photoData;
    
    downloadLink.href = imageUrl;
    downloadLink.style.display = 'block'; // İndirme linkini göster
    
    // Fotoğraf çekildiğinde UI'de değişiklik yapılabilir
    alert('Fotoğraf Çekildi!');
}

startCamera(currentDeviceId); // İlk kamera açılışında başlatma
