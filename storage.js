class Storage {
    static getSearchedUsersFromStorage(){
        // tum kullanicilari al

        let users;

        if (localStorage.getItem("searched") === null){
            users = [];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
        
        return users;
    }

    static addSearchedUserToStorage(username){
        // kullanici ekle

        let users = this.getSearchedUsersFromStorage();

        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched", JSON.stringify(users));
    }

    static clearAllSearchUsersFromStorage(){
        // tum kullanicilari sil

        localStorage.removeItem("searched");
    }
}