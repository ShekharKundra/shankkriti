function prev(b_id) {
    if (b_id == "top") {
        var id = document.getElementsByClassName("item active")[0].id;
        // alert("id" + id);
    }
    else {
        id = document.getElementsByClassName("carousel-item xyz active")[0].id;
        // alert("id" + id);
    }
    if (id == 1 || id == 3) {
        var id2 = parseInt(id) + 1;
        // alert("id =" + id);
        // alert("id2 =" + id2);
        document.getElementById(id).classList.remove('active');
        document.getElementById(id2).classList.add('active');
    }
    else {
        var id2 = parseInt(id) - 1;
        document.getElementById(id).classList.remove('active');
        document.getElementById(id2).classList.add('active');
    }
}

function next(b_id) {
    if (b_id == "top") {
        var id = document.getElementsByClassName("item active")[0].id;
        // alert("id" + id);
    }
    else {
        id = document.getElementsByClassName("carousel-item xyz active")[0].id;
        // alert("id" + id);
    }
    if (id == 1 || id == 3) {
        var id2 = parseInt(id) + 1;
        // alert("id =" + id);
        // alert("id2 =" + id2);
        document.getElementById(id).classList.remove('active');
        document.getElementById(id2).classList.add('active');
    }
    else {
        var id2 = parseInt(id) - 1;
        document.getElementById(id).classList.remove('active');
        document.getElementById(id2).classList.add('active');
    }
}