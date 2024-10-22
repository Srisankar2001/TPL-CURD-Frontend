export default function LoginValidator(input){
    const error = {
        email:"",
        password:""
    }
    const email = input.email.trim()
    const password = input.password.trim()

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

    return error
}