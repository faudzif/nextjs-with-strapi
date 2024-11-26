"use server"
import { getStrapiURL } from "../../utils/api-helpers";

export const documentUpload = async ({filer}:any)=>{
      const formData1 = new FormData();
      formData1.append("files", filer,filer.name);
      const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN
      const baseUrl = getStrapiURL();
      const url = new URL("/api/upload", baseUrl);
      const req =await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
        method: "POST",
        body: formData1,
      })
      const dataResponse = await req.json();
      return dataResponse;
  
  }