let copyContainer = document.querySelector(".copyContainer");
copyContainer.getElementsByClassName("copy-button").addEventListener("click", function() {
    console.log('test');
    let input = copyContainer.querySelector("input.text");
    input.select();
    document.execCommand("copy");
    copyContainer.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(function() {
        copyContainer.classList.remove("active");
    }
    , 2500)
})