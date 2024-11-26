
"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import SignupBtn from '../../atoms/SignupBtn/SignupBtn'
// let file:any;
let docs: any;
export default function Career() {
    const [file, setFile] = useState<File>();
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return
        try {
            const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;
            const data = new FormData();
            data.set('file', file)
            const res = await fetch('api/upload', {
                method: 'POST',
                // headers: {
                //     "Content-Type": "application/json",
                //     Authorization: `Bearer ${token}`,
                //   },
                body: data
            })
            if (!res.ok) throw new Error(await res.text())

        } catch (e: any) {
            console.error(e)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>

                <>
                    <input
                        name="file"
                        placeholder="please enter CV"
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                    // value={formData.file}
                    //   onChange={handleChange}
                    />
                </>

                <SignupBtn
                    classes="signup-btn large contact-form-btn mt-4 lg:mt-6"
                    children={"Send message"}
                    tag="button"
                    iconRight="east"
                />
            </form>
        </div>
    )
}

// export default Career