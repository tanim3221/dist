timeout_var = null;

function typeWriter(selector_target, text_list, placeholder = false, i = 0, text_list_i=0, delay_ms=150) {
    if (!i) {
        if (placeholder) {
            document.querySelector(selector_target).placeholder = "";
        }
        else {
            document.querySelector(selector_target).innerHTML = "";
        }
    }
    txt = text_list[text_list_i];
    if (i < txt.length) {
        if (placeholder) {
            document.querySelector(selector_target).placeholder += txt.charAt(i);
        }
        else {
            document.querySelector(selector_target).innerHTML += txt.charAt(i);
        }
        i++;
        setTimeout(typeWriter, delay_ms, selector_target, text_list, placeholder, i, text_list_i);
    }
    else {
        text_list_i++;
        if (typeof text_list[text_list_i] === "undefined")  {
            setTimeout(typeWriter, (delay_ms*5), selector_target, text_list, placeholder);
        }
        else {
            i = 0;
            setTimeout(typeWriter, (delay_ms*3), selector_target, text_list, placeholder, i, text_list_i);
        }
    }
}

text_list = [
    "Search Product Name e.g. Dell Laptop Notebook Series",
    "Search Brand Name e.g. Microsoft, Samsung, Savlon",
    "Search Category Name e.g. Electronics, Computer Accessories",
];

return_value = typeWriter("#main_search_bar", text_list, true);