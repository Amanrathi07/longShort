import  jwt  from "jsonwebtoken"

export function jwt_create(id:string){
    try {
        if(!id){
            throw new Error("jwt function not get any id ") 
        }

        const token = jwt.sign(id,process.env.SECRET!)
        return token
    } catch (error) {
        console.log("error in function jwt_create ",error);
        return
    }
}