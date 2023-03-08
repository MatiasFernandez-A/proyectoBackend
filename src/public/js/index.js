const socket = io();


const form = document.getElementById("form"); 
const log = document.getElementById("log")


form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = Object.fromEntries(
        new FormData(e.target)
        );
    socket.emit("mensaje", JSON.stringify(data))
});

socket.on("log", data=>{
    log.innerHTML += data;
})