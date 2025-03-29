
const themeToggle = document.querySelector('.theme-toggle');
const themePanel = document.querySelector('.theme-panel');

themeToggle.addEventListener('mouseenter', () => {
    themePanel.classList.add('active');
});

themePanel.addEventListener('mouseleave', () => {
    themePanel.classList.remove('active');
});

document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
        // Usuń aktywną klasę z wszystkich opcji
        document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
        
        // Dodaj aktywną klasę do klikniętej opcji
        option.classList.add('active');
        
        // Zastosuj motyw
        const theme = option.getAttribute('data-theme');
        applyTheme(theme);
    });
});

function applyTheme(theme) {
    const root = document.documentElement;
    
    switch(theme) {
        case 'dark':
            root.style.setProperty('--main-color', '#ffffff');
            document.body.style.background = '#1a1a1a';
            break;
        case 'neon':
            root.style.setProperty('--main-color', '#00ff00');
            document.body.style.backgroundColor = '#000000';
            document.querySelectorAll('.theme-option').forEach(opt => {
                opt.style.animation = 'glow 2s infinite';
            });
            break;
        case 'gradient':
            document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
            root.style.setProperty('--main-color', '#ffffff');
            break;
        default:
            root.style.setProperty('--main-color', 'rgb(41, 41, 41)');
            document.body.style.backgroundColor = 'white';
            document.querySelectorAll('.theme-option').forEach(opt => {
                opt.style.animation = 'none';
            });
    }
}

var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    if (selector.classList.contains("selector_open")){
        selector.classList.remove("selector_open")
    }else{
        selector.classList.add("selector_open")
    }
})

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown")
    })
})

var sex = "m"

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    })
})

var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {

    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })

});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            upload.classList.add("upload_loaded");
            upload.querySelector(".upload_uploaded").src = e.target.result;
            upload.setAttribute("selected", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

document.querySelector(".go").addEventListener('click', () => {

    var empty = [];

    var params = new URLSearchParams();

    params.set("sex", sex)
    if (!upload.hasAttribute("selected")){
        empty.push(upload);
        upload.classList.add("error_shown")
    }else{
        params.set("image", upload.getAttribute("selected"))
    }

    var birthday = "";
    var dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday = birthday + "." + element.value
        if (isEmpty(element.value)){
            dateEmpty = true;
        }
    })

    birthday = birthday.substring(1);

    if (dateEmpty){
        var dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    }else{
        params.set("birthday", birthday)
    }

    document.querySelectorAll(".input_holder").forEach((element) => {

        var input = element.querySelector(".input");

        if (isEmpty(input.value)){
            empty.push(element);
            element.classList.add("error_shown");
        }else{
            params.set(input.id, input.value)
        }

    })

    if (empty.length != 0){
        empty[0].scrollIntoView();
    }else{

        forwardToId(params);
    }

});

function isEmpty(value){

    let pattern = /^\s*$/
    return pattern.test(value);

}

function forwardToId(params){
    location.href = "id.html?" + params.toString();
}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {

    if (guide.classList.contains("unfolded")){
        guide.classList.remove("unfolded");
    }else{
        guide.classList.add("unfolded");
    }

})