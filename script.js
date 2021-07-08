function getHistory() {
  return document.getElementById("history").innerText;
}
function printHistory(num) {
  document.getElementById("history").innerText = num;
}

function getOutput() {
  return document.getElementById("output").innerText;
}
function format(num) {
  if (num == "") return num;
  var x = Number(num);
  return x.toLocaleString("en");
}
function printOutput(num) {
  num = format(num);
  document.getElementById("output").innerText = num;
}
function reverseFormat(num) {
  return num.replace(/,/g, "");
}
var num = document.getElementsByClassName("number");

for (i = 0; i < num.length; i++) {
  num[i].addEventListener("click", function () {
    var out = getOutput();
    if (out == "error") {
      printOutput(Number(this.id));
    } else {
      out = reverseFormat(out);
      if (out != NaN) out += this.id;
      printOutput(Number(out));
    }
  });
}

var operator = document.getElementsByClassName("operator");
for (i = 0; i < operator.length; i++) {
  if (operator[i].id == "clear") {
    operator[i].addEventListener("click", function () {
      printHistory("");
      printOutput("");
    });
  } else if (operator[i].id == "backspace") {
    operator[i].addEventListener("click", function () {
      var output = reverseFormat(getOutput()).toString();
      if (output) {
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    });
  } else {
    operator[i].addEventListener("click", function () {
      var history = getHistory();
      var out = getOutput();
      if (this.id == "=") {
        history += out;
        history = reverseFormat(history);
        if (isNaN(history[history.length - 1])) {
          document.getElementById("output").innerText = "error";
          document.getElementById("history").innerText = "";
        } else {
          history = eval(history);

          printOutput(history);
          printHistory("");
        }
      } else {
        history += out + this.id;
        printHistory(history);
        printOutput("");
      }
    });
  }
}
