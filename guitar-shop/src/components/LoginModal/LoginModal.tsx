import "./LoginModal.css";
import React from "react";
import { observer } from "mobx-react-lite";
import LoginStore from "../../store/LoginStore.js"
import { useState } from "react";
import { SignUpModalProps } from "../../utils/interface/ISignUpModal";
import { ChangeEvent } from "react";
import { ILogin } from "../../utils/interface/ILogin"
import { Stack, TextField, Button, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toJS } from "mobx";

const LoginModal = ({ active, setActive }: SignUpModalProps) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordShown, setPaswordShown] = useState(false)
    const [loginError, setLoginError] = useState("");

    const handleChange = (type: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (type) {
            case 'email':
                setEmail(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            default:
                // Handle the default case if needed
                break;
        }
    };
    function validateEmail(email: string) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }

    const togglePassword = () => {
        setPaswordShown(!passwordShown);
    }

    const postLogin = (data: ILogin) => {
        fetch("http://localhost:4000/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json(); // Parse response as JSON
        })
            .then(function (json) {
                if (json.access_token) {
                    LoginStore.setJwtToken(json.access_token); // Set the jwtToken property
                    console.log(`store  data ${LoginStore.jwtToken}`);
                }
                console.log(json.error)
                switch (json.error) {
                    case "Bad Request":
                        setLoginError("Wrong email or password");
                        break;
                    case "Internal server error":
                        setLoginError("Server is not working")
                    default:
                        setLoginError(""); // Reset error to empty string
                        break;
                }

            })
            .catch(function (error) {
                console.error("Error:", error);
            });

    }
    const LoginData = () => {
        const backendLogin = {
            email: email,
            password: password,

        }
        postLogin(backendLogin)
        console.log(backendLogin)
    }

    const handleLogin = () => {
         if (email.trim() === "" || !validateEmail(email)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
            setLoginError("");
            console.log("registation test")
            LoginData()
        }
    }

    return (
        <div className={active ? "modal active" : "modal"}
            onClick={() => setActive(false)}>
            <div className="modal_login_content"
                onClick={(e) => e.stopPropagation()}>
                <h2>Введіть ваші дані</h2>
                <Stack direction='column' spacing={2}>
                    <TextField type="email" label="Email" required value={email} onChange={(e) => handleChange('email', e)} />
                    {emailError && <p className="error-message">{emailError}</p>}
                    <TextField type={passwordShown ? 'text' : "password"} label="Пароль" required value={password} onChange={(e) => handleChange("password", e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={togglePassword}>
                                        {passwordShown ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />
                    {loginError && <p className="login-message">{loginError}</p>}
                </Stack>

                <Button
                    sx={{ m: 2 }}
                    variant='contained' color='success' onClick={handleLogin}>Увійти</Button>
            </div>

        </div>
    )
}

export default observer(LoginModal);