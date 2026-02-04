function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/";
}

function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let [key, val] = c.split("=");
        if (key === name) return decodeURIComponent(val);
    }
    return "";
}

function saveTodos() {
    let list = [];
    document.querySelectorAll("#ft_list div").forEach(d => {
        list.push(d.textContent);
    });
    setCookie("todos", JSON.stringify(list));
}

function addTodo(text) {
    let div = document.createElement("div");
    div.textContent = text;

    div.onclick = function () {
        if (confirm("Remove this TO DO?")) {
            div.remove();
            saveTodos();
        }
    };

    let list = document.getElementById("ft_list");
    list.prepend(div);
    saveTodos();
}

function newTodo() {
    let text = prompt("New TO DO:");
    if (text && text.trim() !== "") {
        addTodo(text);
    }
}

window.onload = function () {
    let data = getCookie("todos");
    if (data) {
        JSON.parse(data).reverse().forEach(t => addTodo(t));
    }
};