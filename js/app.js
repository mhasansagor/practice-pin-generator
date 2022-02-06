var count = 0;

function getPin() {
  const pin = Math.round(Math.random() * 10000);
  const pinString = pin + "";
  if (pinString.length == 4) {
    return pin;
  } else {
    return getPin();
  }
}

function pinGenerate() {
  const pin = getPin();
  document.getElementById("display-pin").value = pin;
  document.getElementById("display-pin").disabled = false;
}

document.getElementById("key-pad").addEventListener("click", function (event) {
  const number = event.target.innerText;
  const numberInput = document.getElementById("type-numbers");
  if (isNaN(number)) {
    if (number == "C") {
      numberInput.value = "";
    } else if (number == "<") {
      const previousNumber = numberInput.value;
      numberInput.value = previousNumber.slice(0, -1);
    }
  } else {
    const previousNumber = numberInput.value;
    const newNumber = previousNumber + number;
    if (newNumber.length <= 4) {
      numberInput.value = newNumber;
    } else {
      return;
    }
  }
});

function verifyPin() {
  const generatePin = document.getElementById("display-pin").value;
  const InputPin = document.getElementById("type-numbers").value;
  const errorPin = document.getElementById("error-mssg");
  const successPin = document.getElementById("success-mssg");
  const warningMsg = document.getElementById("warning-msg");

  if (generatePin == 0) {
    successPin.style.display = "none";
    errorPin.style.display = "none";
  } else if (generatePin == InputPin) {
    successPin.style.display = "block";
    errorPin.style.display = "none";
    document.getElementById("display-pin").value = "";
    document.getElementById("type-numbers").value = "";
    document.getElementById("display-pin").disabled = true;
    warningMsg.innerText = " ";
  } else {
    successPin.style.display = "none";
    errorPin.style.display = "block";
    count++;
    if (count < 4) {
      const exitTime = 4 - count;
      warningMsg.innerText = exitTime + " try left";
    } else if (count == 4) {
      warningMsg.innerText = "generate new pin";
      document.getElementById("display-pin").value = "";
      document.getElementById("display-pin").disabled = true;
      successPin.style.display = "none";
      errorPin.style.display = "none";
      count = 0;
    }
    document
      .getElementById("generate-btn")
      .addEventListener("click", function () {
        const errorPin = document.getElementById("error-mssg");
        const successPin = document.getElementById("success-mssg");
        const warningMsg = document.getElementById("warning-msg");
        successPin.style.display = "none";
        errorPin.style.display = "none";
        warningMsg.innerText = "";
        count = 0;
      });
  }
  document.getElementById("type-numbers").value = "";
}
