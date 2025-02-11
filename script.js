const startButton = document.getElementById('startButton');
const videoElement = document.getElementById('video');

startButton.addEventListener('click', function () {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                videoElement.srcObject = stream;
                startButton.style.display = 'none'; // Butonu gizle
            })
            .catch(function (error) {
                alert("Kamera erişimi reddedildi veya bir hata oluştu.");
            });
    } else {
        alert("Tarayıcınız kamera desteği sağlamıyor.");
    }
});
