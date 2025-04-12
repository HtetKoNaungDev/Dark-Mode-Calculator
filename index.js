function toggleMode() {

    const body = document.body.classList;

    body.toggle('dark-mode');

    const modeBtn = document.querySelector('.toggle-mode');

    if (body.contains('dark-mode')) {
        modeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        modeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    
}