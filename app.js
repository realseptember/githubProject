// elementleri secme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e){
    let username = nameInput.value.trim();

    if (username === ""){
        alert("Lutfen gecerli bir kullanici adi giriniz");
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if (response.user.message === "Not Found"){
                //hata mesaji
                ui.showError("Kullanici bulunamadi");
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);

                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput(); //input temizleme
    e.preventDefault();
}

function clearAllSearched(){
    //Tum arananlari temizle

    if(confirm("Emin misiniz?")){
        //silme
        Storage.clearAllSearchUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched(){
    //Arananlari Storage'dan al ve ui'a ekle

    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {
        result += `
            <li class="list-group-item">${user}</li>
        `;
    });

    lastUsers.innerHTML = result;
}