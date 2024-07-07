import {z} from 'zod'

export const verifySchema = ({
    code:z.string().length(6,"verification code must be 6 of digits")
})