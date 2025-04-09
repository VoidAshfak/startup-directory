"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useActionState } from "react"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { formSchema } from "@/lib/validation"


const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    // const [pitch, setPitch] = useState('');
    // const [category, setCategory] = useState('');
    // const [description, setDescription] = useState('');
    // const [title, setTitle] = useState('');
    // const [link, setLink] = useState('');
    // const isPending = false;


    const handleFormSubmit = async (prevState: any, data: FormData) => {
            
        const formData = Object.fromEntries(data);
        console.log("Submitted data: ",formData)
        

        try {
            await formSchema.parseAsync(formData);
        } catch (error:any) {
            const fieldErrors = error.flatten().fieldErrors;
            setErrors(fieldErrors);
            return {
                ...prevState,
                error: "Validation failed",
                status: "ERROR",
            }
        }

    }


const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL',
});



return (
    <form action={formAction} className="startup-form">
        <div>
            <label htmlFor="title" className="startup-form_label">Title</label>
            <Input
                id="title"
                name="title"
                className="startup-form_input"
                required
                placeholder="Startup title"
            />
            {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>

        <div>
            <label htmlFor="description" className="startup-form_label">Description</label>
            <Textarea
                id="description"
                name="description"
                className="startup-form_textarea"
                required
                placeholder="Startup title"
            />
            {errors.description && <p className="startup-form_error">{errors.description}</p>}
        </div>

        <div>
            <label htmlFor="category" className="startup-form_label">Category</label>
            <Input
                id="category"
                name="category"
                className="startup-form_input"
                required
                placeholder="Startup category (Tech, Health, Education)"
            />
            {errors.category && <p className="startup-form_error">{errors.category}</p>}
        </div>

        <div>
            <label htmlFor="link" className="startup-form_label">Image URL</label>
            <Input
                id="link"
                name="link"
                className="startup-form_input"
                required
                placeholder="Startup image URL"
            />
            {errors.link && <p className="startup-form_error">{errors.link}</p>}
        </div>

        <div>
            <label htmlFor="pitch" className="startup-form_label">Pitch</label>
            <Textarea
                id="pitch"
                name="pitch"
                className="startup-form_textarea"
                required
                placeholder="Pitch your startup"
            />
            {errors.description && <p className="startup-form_error">{errors.description}</p>}
        </div>

        <Button
            type="submit"
            className="startup-form_btn text-white100"
            disabled={isPending}
        >
            {isPending ? "Submitting..." : "Submit"}
            <Send className="size-6 ml-2" />
        </Button>

    </form>
)
}

export default StartupForm