import { observable, } from "mobx";

const LoginStore = observable({
    jwtToken: "",
    email: "",

    
    setJwtToken(token) {
        this.jwtToken = token;
    },
    setLoginEmail(email){
        this.email = email
    },



    saveToLocalStorage(data) {
        // Save data to local storage
        localStorage.setItem("loginData", JSON.stringify(data));
    },
});

export default LoginStore;