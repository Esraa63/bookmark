var nameInput = document.getElementById("bookmarkName");
var urlInput=document.getElementById("bookmarkUrl");
var bookmarkList=[];
var bookmark ={};
//console.log(regexName.test("41Ahmed"));
console.log();
if(localStorage.getItem("bookmarkers")!=null){

    bookmarkList=JSON.parse(localStorage.getItem("bookmarkers"));
    display();
}

function addBookmark(){
  if(validationRegexName()==true&&validationRegexUrl()==true){
        bookmark = {
            name:nameInput.value,
            url:urlInput.value
        }
        if(!(JSON.stringify(bookmarkList).toLocaleLowerCase().includes(('"name":'+'"'+bookmark.name.toLocaleLowerCase()+'"')))){
            bookmarkList.push(bookmark);
            localStorage.setItem("bookmarkers",JSON.stringify(bookmarkList));
            console.log(bookmarkList);
        }else{
             alert("this name is exists");
           
        }
                display();
                clearForm();

    } else{
            $(document).ready(function(){
                // Open modal on page load
                $("#myModal").modal('show');
            });
           
    }
}

function clearForm(){
    nameInput.value="";
    urlInput.value=""; 
}

function display(){
    var container="";
        for(var i=0 ; i<bookmarkList.length ; i++){
            // console.log(bookmarkList[i]);
           container+=`
            <tr>
            <td>${i+1}</td>
            <td>${ bookmarkList[i].name}</td>
            <td><button onclick="visitUrl(${i});" class="btn visit px-3"> <i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
            <td> <button onclick="deleteItem(${i});" class="btn del px-3"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>`
    }
    
    document.getElementById("bookmarkListDisplay").innerHTML=container;
}

function deleteItem(index){
    bookmarkList.splice(index,1);
    localStorage.setItem("bookmarkers",JSON.stringify(bookmarkList));
    display();
}

function visitUrl(i){
    var text="https://";
    if(bookmarkList[i].url.includes("https://")||bookmarkList[i].url.includes("http://")){
        window.open(bookmarkList[i].url, "_blank");
    }else{
        text+= bookmarkList[i].url;
        console.log(text);
        window.open(text, "_blank");
    }
}

function validationRegexName(){
 var textName=nameInput.value;
 var regexName=/^([a-zA-Z]{3,})(\s[a-zA-Z]{3,}){0,2}$/; //pattren for bookmarkName
 if(regexName.test(textName)==true){
     nameInput.classList.add("is-valid");
     nameInput.classList.remove("is-invalid");
     return true;
 }else{
     nameInput.classList.add("is-invalid");
     nameInput.classList.remove("is-valid");
     return false;
 }
}

function validationRegexUrl(){
   var textUrl=urlInput.value;
   var regexUrl=/^(http:\/\/|https:\/\/)?(www\.)[a-zA-Z\d]{2,}\.?[a-zA-Z\d]+\.(com|org|edu|net|gov|info|co|tech)$/;
   if(regexUrl.test(textUrl)==true){
    urlInput.classList.add("is-valid");
    urlInput.classList.remove("is-invalid");
    return true;
}else{
    urlInput.classList.add("is-invalid");
    urlInput.classList.remove("is-valid");
    return false;
}
}