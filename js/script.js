var siteName=document.getElementById("siteName");
var siteUrl=document.getElementById("siteUrl");
var bookmarkList=document.getElementById("bookmarkList");
var NameAlert=document.getElementById("nameAlert");
var validationAlert=document.getElementById("validationAlert");
var subBtn=document.getElementById("submitBtn");
var searchInput=document.getElementById("searchInput");
var bookmarks = [];
var currentIndex ;

if(localStorage.getItem("bookmarks") == null){
    var bookmarks = [];
}else{
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    display();
}


//==================validation=====================
subBtn.onclick= function(){
    if(validationName() == true && validationUrl() == true){
        if(subBtn.innerHTML==='Submit'){
        createBookmark();
        siteName.classList.remove("is-valid");
        siteUrl.classList.remove("is-valid");
        siteName.value = "";
        siteUrl.value = "";
        }
        else{
            saveURL();
            subBtn.innerHTML = "Submit";
            siteName.value = "";
            siteUrl.value = "";
        }
    }else{
        validationAlert.classList.remove("d-none");

    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    display();
}


//==================validationName=================
function validationName(){
    var regex=/^[A-Za-z]{3,30}$/
    if(regex.test(siteName.value)==true ){
        siteName.classList.remove("is-invalid");
        siteName.classList.add("is-valid");
        NameAlert.classList.add("d-none");
        subBtn.classList.remove("disabled"); 
         validationAlert.classList.add("d-none");  
        return true;
    }else{
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        NameAlert.classList.remove("d-none");
        subBtn.classList.add("disabled");
         validationAlert.classList.remove("d-none");
        return false;
    }
}


//==================validationUrl==================
function validationUrl(){
   if(siteUrl.value.startsWith("http://") || siteUrl.value.startsWith("https://")){
        siteUrl.classList.remove("is-invalid");
        siteUrl.classList.add("is-valid");
        subBtn.classList.remove("disabled"); 
         validationAlert.classList.add("d-none");
        return true;
    }else{
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
        subBtn.classList.add("disabled");
         validationAlert.classList.remove("d-none");
        return false;
    }

}


//==================createBookmark=================
function createBookmark(){
   var bookMark={
    name: siteName.value,
    url: siteUrl.value
   } 
    bookmarks.push(bookMark);  
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    display();
    console.log(bookmarks);
}


//==================display=====================
function display(){
trs='';
for(var i=0 ; i<bookmarks.length; i++){
    trs+=`
    <tr class="border-bottom border-secondary-subtle ">
        <td>${i+1}</td>
        <td>${bookmarks[i].name}</td>
       <td><button type="button" class="btn btn-outline-primary"><a href="${bookmarks[i].url}" target="_blank"><i class="fa-regular fa-eye"></i></a></button></td>
        <td><button type="button" class="btn btn-outline-success" onclick="UpdateURL(${i})"><i class="fa-solid fa-arrow-turn-up"></i></button></td>
        <td><button type="button" class="btn btn-outline-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash"></i></button></td>                                
    </tr>
    `
}
document.getElementById("bookmarkList").innerHTML=trs;
}


//==================search=====================
function searchBookmark(){
    trs='';
for(var i=0 ; i<bookmarks.length; i++){
    if(bookmarks[i].name.includes(searchInput.value)){
trs+=`
    <tr class="border-bottom border-secondary-subtle ">
        <td>${i+1}</td>
        <td>${bookmarks[i].name}</td>
       <td><button type="button" class="btn btn-outline-primary"><a href="${bookmarks[i].url}" target="_blank"><i class="fa-regular fa-eye"></i></a></button></td>
        <td><button type="button" class="btn btn-outline-success" onclick="UpdateURL(${i})"><i class="fa-solid fa-arrow-turn-up"></i></button></td>
        <td><button type="button" class="btn btn-outline-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash"></i></button></td>                                
    </tr>
    `
    }
    
}
document.getElementById("bookmarkList").innerHTML=trs;
}


//==================deleteBookmark=====================
function deleteBookmark(index){
    bookmarks.splice(index, 1);
    if(bookmarks.length <1){
        localStorage.clear();
    }
    else{
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    display();
}

//==================saveURL=====================
function saveURL(){
var bookMark={
    name: siteName.value,
    url: siteUrl.value
   } 
bookmarks[currentIndex] = bookMark;
subBtn.innerHTML = "Submit";
}

//==================UpdateURL=====================
function UpdateURL(index){
    currentIndex=index;
    siteName.value = bookmarks[index].name;
    siteUrl.value = bookmarks[index].url;
    subBtn.innerHTML = "Update URL";

}
