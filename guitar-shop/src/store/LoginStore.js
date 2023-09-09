import { observable, } from "mobx";

const LoginStore = observable({
    jwtToken: "",

    
    setJwtToken(token) {
        this.jwtToken = token;
    },

    saveToLocalStorage(data) {
        // Save data to local storage
        localStorage.setItem("loginData", JSON.stringify(data));
    },
});

export default LoginStore;