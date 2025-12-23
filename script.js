let extractedData = "";

function scanQR() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Please upload a QR image");
    return;
  }

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const qr = jsQR(imageData.data, canvas.width, canvas.height);

    if (qr) {
      extractedData = qr.data;
      document.getElementById("upiData").innerText =
        "UPI QR Detected: " + extractedData;
    } else {
      alert("QR not detected. Use a clear QR image.");
    }
  };
}

function secureQR() {
  if (!extractedData) {
    alert("Scan a QR first");
    return;
  }

  const hash = "BLK-" + Date.now().toString(36);

  document.getElementById("hash").innerText =
    "Blockchain Hash: " + hash;

  document.getElementById("secureQR").innerHTML = "";

  new QRCode(document.getElementById("secureQR"), {
    text: extractedData + "|HASH:" + hash,
    width: 200,
    height: 200
  });
}
