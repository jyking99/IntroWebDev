function underConstruction() {
    alert("This feature is curently under construction!");
}

function startIndex() {
    renderFrames();
    initCookie();
    foot();
    renderOptions();
    rszGallery(document.cookie.substring(0,1));
}

function startEdit() {
    renderEdit();
    initCookie();
    foot();
}

function startAbout() {
    initCookie();
    foot();
}

function initCookie() {
    let ck = document.cookie;
    if (ck == "") {
        document.cookie = 3 + ", ";
    }
}

function renderOptions() {
    const dropdown = document.getElementById("cols");
    const d = document.cookie[0];
    for (let i=1; i<5; i++) {
        const opt = document.createElement("option");
        opt.setAttribute("value", i);
        if (i == d) {
            opt.setAttribute("selected", null);
        }
        opt.innerText = i;
        dropdown.appendChild(opt);
    }
}

function saveUrl(form) {
    if (form.url.value == "") {
        return;
    }

    let ck = document.cookie;
    const list = ck.substring(ck.indexOf(","),ck.length).split(",").filter(e => e.length>0);
    let count = list.length;

    if (count < 9) {
        if (count == 0) {
            document.cookie = ck + form.url.value;
        } else {
            document.cookie = ck + "," + form.url.value;
        }
    } else {
        alert("Too many pins!");
    }
    location.reload();
}

function getFrame(url) {
    const frame = document.createElement("iframe");
    frame.setAttribute("src", url);
    return frame;
}

function renderFrames() {
    const target = document.getElementById("target");
    let ck = document.cookie;

    const list = ck.substring(ck.indexOf(","),ck.length).split(",").filter(e => e.length>0);
    const count = list.length;

    if (count >= 1) {
        list.forEach((url) => target.appendChild(getFrame(url)));
    } else {
        const h = document.createElement("h4");
        h.innerText = "Nothing for now...";
        h.style.padding = "1em";
        const msg = document.createElement("p");
        msg.innerText = "Please go to Links page to add links, or refer to About page for help.";
        target.appendChild(h);
        target.appendChild(msg);
    }
}

function renderEdit() {
    const target = document.getElementById("editlist");
    let ck = document.cookie;
    const list = ck.substring(ck.indexOf(","),ck.length).split(",").filter(e => e.length>0);
    const count = list.length;
    if (count >= 1) {
        let i = 0;
        list.forEach((url) => {
            target.appendChild(editForm(url, i))
            i++;
        });
    }
}

function editForm(url, i) {
    const li = document.createElement("li");
    const form = document.createElement("form");

    const label = document.createElement("label");
    label.innerText = url;
    label.setAttribute("name", "url");
    form.appendChild(label);

    const btn = document.createElement("input");
    btn.setAttribute("type", "submit");
    btn.setAttribute("value", "remove");
    btn.setAttribute("onclick", "remove(" + i + ")");
    form.appendChild(btn);

    const frame = document.createElement("iframe");
    frame.setAttribute("src", url);

    li.appendChild(form);
    li.appendChild(document.createElement("br"));
    li.appendChild(frame);
    return li;
}

function remove(i) {
    var urls = document.cookie.split(",");
    urls.splice(i+1, 1);
    document.cookie = urls.join(",");
    if (urls.length == 1) {
        document.cookie += ",";
    }
}

function prevUrl(form) {
    let val = form.url.value;
    if (val == "") {
        return;
    }
    const target = document.getElementById("preview");
    const frame = document.createElement("iframe");
    frame.setAttribute("src", val);
    target.replaceChildren(frame);
}

function resizeGallery() {
    const slct = document.getElementById("cols");
    rszGallery(slct.value);
}

function rszGallery(i) {
    const width = document.body.clientWidth;
    Array.prototype.slice.call(document.getElementsByTagName("iframe")).forEach(e => {
        let w = width / i;
        e.setAttribute("width", w);
        e.setAttribute("height", w * 0.6);
    });

    let ck = document.cookie;
    if (ck == "") {
        document.cookie = i + ", ";
    } else {
        document.cookie = i + ck.substring(ck.indexOf(","),ck.length);
    }
}

function foot() {
    const ftr = document.getElementById("ftr");
    const lb1 = document.createElement("label");
    const lb2 = document.createElement("label");
    const br = document.createElement("br");

    lb1.innerText = "Author: Junyi Wang";
    lb2.innerText = "Email: wangcgv@bc.edu";

    ftr.appendChild(lb1);
    ftr.appendChild(br);
    ftr.appendChild(lb2);
}