export default function RegisterValidator(input){
    const error = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const name = input.name.trim()
    const email = input.email.trim()
    const password = input.password.trim()
    const confirmPassword = input.confirmPassword.trim()


    if(name === ""){
        error.name = "Name Field is Empty"
    }else{
        error.name = ""
    }

    if(email === ""){
        error.email = "Email Field is Empty"
    }else if(!(/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email))){
        error.email = "Invalid Email"
    }else{
        error.email = ""
    }

    if(password === ""){
        error.password = "Password Field is Empty"
    }else{
        error.password = ""
    }

    if(confirmPassword === ""){
        error.confirmPassword = "Confirm Password Field is Empty"
    }else if(password !== confirmPassword){
        error.confirmPassword = "Password and Confirm Passwords should match"
    }else{
        error.confirmPassword = ""
    }

    return error
}