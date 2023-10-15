function removeCommasAndParse(numberString) {
    const numericValue = parseFloat(numberString.replace(/,/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
}

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
        else if(fields[i].id == "account_id" || fields[i].id == "inventory") body[fields[i].id] = parseInt(document.querySelector("form[name='" + form + "'] #" + fields[i].id).value)
        else if(fields[i].id == "price") body[fields[i].id] = removeCommasAndParse(document.querySelector("form[name='" + form + "'] #" + fields[i].id).value)
        else body[fields[i].id] = document.querySelector("form[name='" + form + "'] #" + fields[i].id).value
    for (i = 0; i < textareas.length; i++)
        body[textareas[i].id] = document.querySelector("form[name='" + form + "'] #" + textareas[i].id).value;
    for (i = 0; i < selects.length; i++)
        if(selects[i].id == "categoryId" && selects[i].value == "") body[selects[i].id] = null;
        else body["categoryId"] = parseInt(document.querySelector("form[name='" + form + "'] #" + selects[i].id).value);




    // console.log(url)
    // console.log(method)
    // console.log(body)
    return MagicRequest(method, url, body)
}

const base_URL = "https://api.dastakapp.ir/api/v1/"
const upLoader = "https://api.dastakapp.ir/api/v1/"


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
            // console.log(res.data.url)
            document.querySelector("form[name='" + form + "'] #image").setAttribute("file", res.data.url)
            document.getElementById("submit").disabled = false
            document.getElementById("kt_body").style.opacity = "1"
            toastr.success("با موفقیت اپلود شد");
        }).catch(error => console.log('error', error));
}

function responseMsg(message){
    switch(message){
        case "Mobile number already exists":
            return "قبلا عضو شدی! از قسمت ورود وارد شو"
        case "Error":
            return "!اطلاعات رو با دقت پر کن"
        case "Unauthorized":
            window.location.replace("/login")
        default: return message
    }
}

function MagicRequest(method, url, params = {}, reload = true, list= false) {
    // console.log("-----------")
    // console.log("method: "+method)
    // console.log("url: "+base_URL+url)
    // console.log("params: ")
    // console.log(params)
    // console.log("-----------")
    var myHeaders = new Headers();
    if (method == "GET" || method == "get" || list) {
        let result
        // console.log(localStorage.getItem("token"))
        if(localStorage.getItem("token"))
        {
            myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));
        }

        var requestOptions = {
            method: method,
            headers: myHeaders,
            redirect: 'follow'
        };
        if(list){
            requestOptions.body = JSON.stringify(params);
        }

        // console.log(requestOptions)

        return fetch(base_URL + url, requestOptions)
    }
    if (method == "DELETE" || method == "delete") {
       
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
          };
          
          return fetch(base_URL + url, requestOptions).then(response => response.text())
          .then(result => {
            result = JSON.parse(result)
            if(result.status==true || result.status=="true"){
                if(reload) {
                    setTimeout(()=> {location.reload()}, 1000)
                    toastr.success("با موفقیت انجام شد");
                }
                return result
            }else{
                console.log(result.alert.title)
                if(Array.isArray(result.alert.title)) toastr.error(responseMsg(result.alert.title[0])); else toastr.error(responseMsg(result.alert.title));
                
            }
        }).catch(error => console.log('error', error));      
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
        redirect: 'follow'
    };

    return fetch(base_URL + url, requestOptions).then(response => response.text())
        .then(result => {
            result = JSON.parse(result)
            if(!list)
           {
            if(result.status==true || result.status=="true"){
                if(reload) {
                    toastr.success("با موفقیت انجام شد");
                    setTimeout(()=> {location.reload()}, 1000)
                }
                return result
            }else{
                console.log(result.alert)
                // if(Array.isArray(result.validationErrors)) toastr.error(responseMsg(result.alert.title[0])); else 
                toastr.error(result.alert);
                
            }
           }
        }).catch(error => console.log('error', error));
}
