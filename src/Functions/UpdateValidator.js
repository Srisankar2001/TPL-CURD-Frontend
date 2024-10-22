export default function UpdateValidator(input,user){
    const error = {
        name: ""
    }
    const old_name = user.name.trim()
    const name = input.name.trim()

    if(name === ""){
        error.name = "Name Field is Empty"
    }
    else if(old_name === name){
        error.name = "Name is not Changed"
    }else{
        error.name = ""
    }

    return error
}