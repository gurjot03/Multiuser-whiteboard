const socket = io();

let p1 = $("#p1");
let p2 = $("#p2");

p1.show();
p2.hide();

$("#button").click(() => {
    socket.emit("id", {
        username: $("#userid").val(),
    });
    
    p2.show();
    p1.hide();
});

socket.on("data_send", (data) => {
    
    $("#username").text(data.username);
});


const canvas = document.getElementById("textarea");
const ctx = canvas.getContext("2d");

socket.on("msg_send", (data) => {
   
    let image = new Image();
    image.src = data.input;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log(image);
    image.onload = function () {
       // console.log(image.width); // image is loaded and we have image width
        ctx.drawImage(image, 0, 0);
    };
    // document.body.appendChild(image);
});
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let painting = false;
ctx.fillStyle="hotpink";
let penSize = 10;
const colorCircle = document.querySelectorAll(".color-circle");


function start() {
    painting = true;
}
function end() {
    painting = false;
    ctx.beginPath();
    var base64imagedata = canvas.toDataURL("image/png");
    socket.emit("draw", {
        input: base64imagedata,
        username: $("#username").text(),
    });
}
function draw(event) {
    if (!painting) return;
    ctx.lineWidth = penSize;
    ctx.lineCap = "round";
    ctx.strokeStyle=ctx.fillStyle;


    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
}

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", end);
canvas.addEventListener("mousemove", draw);
// });

// s.on('msg_send',(data)=>{
// //console.log(data.input)

// $('#textarea').val(data.input)
// })


function penSizeChange(pensize) {
    penSize = pensize;
}

  
const selectColor = (elem) => {
    removeActiveCircleColor();
  
    ctx.fillStyle = elem.getAttribute("data-color");
    elem.classList.add("active");
  };
  
const removeActiveCircleColor = () => {
    colorCircle.forEach((circle) => {
      circle.classList.remove("active");
    });
  };
  
function penSizeChange(pensize) {
    penSize = pensize;
  }
  
  const favColor = (elem) => {
    removeActiveCircleColor();
    ctx.fillStyle = elem.value;
  };
  
document.querySelector(".fa-refresh").addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });


  
  
 