import "./SignUpModal.css";
import React from "react";
import { useState } from "react";
import { SignUpModalProps } from "../../utils/interface/ISignUpModal";
import { ChangeEvent } from "react";
import {IRegistration} from "../../utils/interface/IRegistration"
import { Stack, TextField, Button, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUpModal = ({ active, setActive }: SignUpModalProps) => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordShown, setPaswordShown] = useState(false)
    const [registrationError, setRegistrationError] = useState("")

    const handleChange = (type: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (type) {
            case 'name':
                setName(event.target.value);
                break;
            case 'phoneNumber':
                setPhoneNumber(event.target.value);
                break;
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

    const validatePhoneNumber = (phoneNumber: string) => {
        let re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;;
        return re.test(phoneNumber);
    };

    function validateEmail(email: string) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }

    const togglePassword = () => {
        setPaswordShown(!passwordShown);
    }


    const postRegister = (data: IRegistration) => {
        fetch("http://localhost:4000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json(); // Parse response as JSON
        })
            .then(function (json) {
                console.log(json)
                console.log(json.error)
                switch (json.error) {
                    case "User already exists":
                        setRegistrationError("User with this email already exists");
                        break;
                    default:
                        setRegistrationError(""); // Reset error to empty string
                        break;
                }

            })
            .catch(function (error) {
                console.error("Error:", error);
            });

    } 


    const RegistrationData =() => {
        const backendRegistration = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: password,

        }
        postRegister(backendRegistration)
        console.log(backendRegistration)
    }



    const handleRegistration = () => {
        if (phoneNumber.trim() === "" || !validatePhoneNumber(phoneNumber)) {
            setPhoneNumberError("Please enter a valid phone number");
        } else if (email.trim() === "" || !validateEmail(email)) {
            setEmailError("Please enter a valid email address");
        } else {
            setPhoneNumberError("");
            setEmailError("");
            setRegistrationError(""); 
            console.log("registation test")
            RegistrationData()
        }
    }

    return (
        <div className={active ? "modal active" : "modal"}
            onClick={() => setActive(false)}>
            <div className="modal_registration_content"
                onClick={(e) => e.stopPropagation()}>
                <h2>Введіть ваші дані</h2>
                <Stack direction='column' spacing={2}>
                    <TextField type="text" label="Ім'я" required value={name} onChange={(e) => handleChange('name', e)} />
                    <TextField type="tel" label="Номер телефону" required value={phoneNumber} InputProps={{
                        startAdornment: <InputAdornment position="start">+38</InputAdornment>
                    }} onChange={(e) => handleChange('phoneNumber', e)} />
                    <TextField type="email" label="Email" required value={email} onChange={(e) => handleChange('email', e)} />
                    {phoneNumberError && <p className="error-message">{phoneNumberError}</p>}
                    {emailError && <p className="error-message">{emailError}</p>}
                    <TextField type={passwordShown? 'text': "password"} label="Пароль" required value={password} onChange={(e) => handleChange("password", e)}
                    InputProps={{endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={togglePassword}>
                                {passwordShown ? <Visibility /> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )}} />
                    {registrationError && <p className="registration-message">{registrationError}</p>}
                </Stack>

                <Button
                    sx={{ m: 2 }}
                    variant='contained' color='success' onClick={handleRegistration}>Зареєструватись</Button>
            </div>

        </div>
    )
}
export default SignUpModal;