import zod from "zod"
export const addEntrySchema = zod.object({
    title : zod.string().min(1),
    genre : zod.string().min(1),
    author: zod.string().min(1),
    date: zod.string().date().transform((val, ctx) => {
        let date = new Date(val)
        let currDate = new Date()
        if(date > currDate){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message : "Enter a date earlier than or equal to today"
            })
            return zod.NEVER
        }
        return val
    }),
    isbn: zod.string().transform((val, ctx) => {
        let correct = true
        for(let i = 0; i < val.length; i++){
            if(val.charCodeAt(i) < 48 || val.charCodeAt(i) > 57){
                correct = false
            }
        }
        if(!correct || val.length != 13){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message : "Enter a valid ISBN"
            })
            return zod.NEVER
        }
        return val
    })
})

export const filterSchema = zod.object({
    title: zod.string(),
    author: zod.string(),
    published_after: zod.string().date().transform(
        (value, ctx) => {
            const date = new Date(value)
            const currDate = new Date()
            if(date > currDate){
                ctx.addIssue({
                    code: zod.ZodIssueCode.custom,
                    message : "Enter a date earlier than or equals to today."
                })
                return zod.NEVER
            }
            return value
        }
    ),
    published_before: zod.string().date().transform(
        (value, ctx) => {
            const date = new Date(value)
            const currDate = new Date()
            if(date > currDate){
                ctx.addIssue({
                    code: zod.ZodIssueCode.custom,
                    message : "Enter a date earlier than or equals to today."
                })
                return zod.NEVER
            }
            return value
        }
    ),
    isbn: zod.string().transform((val, ctx) => {
        let correct = true
        for(let i = 0; i < val.length; i++){
            if(val.charCodeAt(i) < 48 || val.charCodeAt(i) > 57){
                correct = false
                break
            }
        }
        if(!correct){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "Enter only digits"
            })
            return zod.NEVER
        }
        return  val
    })
})
export type bookField = zod.infer<typeof addEntrySchema>
export type filterField = zod.infer<typeof filterSchema>