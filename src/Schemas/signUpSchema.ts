import {z} from 'zod'

export const usernameValidation = z.
string().
min(2,"Username must be atleast 2 characters").
max(20 ,"Username must not exceed 20 char").
regex(/[a-zA-Z][a-zA-Z0-9-_]{2,20}/gi,"Username must not contain spe")

export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6 , {message:"Password must be at least 6 character"})
})