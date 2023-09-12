function validateForm(form) {
    let formError = false
    let fields = document.forms[form].getElementsByTagName("input")
    let textareas = document.forms[form].getElementsByTagName("textarea")
    let selects = document.forms[form].getElementsByTagName("select")

    let method = document.forms[form].getAttribute("method")
    let url = document.forms[form].getAttribute("url")

    let body = {}
    for (i = 0; i < fields.length; i++)
        if (fields[i].type == "file") body[fields[i].id] = document.querySelector("form[name='" + form + "'] #" + fields[i].id).getAttribute("file")
        else if(fields[i].id == "account_id" || fields[i].id == "price" || fields[i].id == "stock_count") body[fields[i].id] = parseInt(document.querySelector("form[name='" + form + "'] #" + fields[i].id).value)
        else body[fields[i].id] = document.querySelector("form[name='" + form + "'] #" + fields[i].id).value
    for (i = 0; i < textareas.length; i++)
        body[textareas[i].id] = document.querySelector("form[name='" + form + "'] #" + textareas[i].id).value;
    for (i = 0; i < selects.length; i++)
        if(selects[i].id == "categories_id" && selects[i].value == "") body[selects[i].id] = null;
        else body[selects[i].id] = document.querySelector("form[name='" + form + "'] #" + selects[i].id).value;




    // console.log(url)
    console.log(method)
    console.log(body)
    return MagicRequest(method, url, body)
}

const base_URL = "https://api.dastakapp.ir/"
const upLoader = "https://api.dastakapp.ir/"


function imageUpload(url, form) {
    toastr.info("لطفا صبر کن");
    document.getElementById("submit").disabled = true
    document.getElementById("kt_body").style.opacity = "0.5"
    const fileInput = document.querySelector("form[name='" + form + "'] #image");
    var formdata = new FormData();
    formdata.append("image", fileInput.files[0], url);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch(upLoader + "file", requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = (JSON.parse(result))
            console.log(res.data.url)
            document.querySelector("form[name='" + form + "'] #image").setAttribute("file", res.data.url)
            document.getElementById("submit").disabled = false
            document.getElementById("kt_body").style.opacity = "1"
            toastr.success("با موفقیت اپلود شد");
        }).catch(error => console.log('error', error));
}

function MagicRequest(method, url, params = {}, reload = true) {
    var myHeaders = new Headers();
    if (method == "GET" || method == "get") {
        let result
        console.log(localStorage.getItem("token"))
        if(localStorage.getItem("token"))
        {
            myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));
        }

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            'Access-Control-Allow-Origin': '*',
        };

        console.log(requestOptions)

        return fetch(base_URL + url, requestOptions)
    }
    if (method == "DELETE" || method == "delete") {
       
        if(localStorage.getItem("token"))
        {
            myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));
        }
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
          };
          
          fetch(url+method, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));          
    }

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(params);
    if(localStorage.getItem("token"))
    {
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));
    }
    var requestOptions = {
        method: method,
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        'Access-Control-Allow-Origin': '*',
    };

    return fetch(base_URL + url, requestOptions).then(response => response.text())
        .then(result => {
            result = JSON.parse(result)
            if(result.status==200 || result.status==201){
                if(reload) {
                    setTimeout(location.reload(), 500)
                    toastr.success("با موفقیت انجام شد");
                }
                return result
            }else{
                console.log(result.message)
                if(Array.isArray(result.message)) toastr.error(result.message[0]); else toastr.error(result.message);
                
            }
        }).catch(error => console.log('error', error));
}
