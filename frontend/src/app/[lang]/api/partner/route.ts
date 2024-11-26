import { NextResponse } from "next/server";
import { getStrapiURL } from "../../utils/api-helpers";
export async function GET(request: Request, response: Response) {
    try{
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
        const lang = request.url.split("/").at(3)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions: any = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
            next: {revalidate: 3600}
        };
        if(lang === 'ar'){
            const res = await fetch(getStrapiURL(`/api/partners?locale=ar&filters[slug]=all&populate=*`), requestOptions)
                .then((response) => {return response})
                .catch((error) => console.error(error));
                return res;
        }else{
            const res = await fetch(getStrapiURL(`/api/partners?locale=en&filters[slug]=all&populate=*`), requestOptions)
                .then((response) => {return response})
                .catch((error) => console.error(error));
                return res;
        }
    }catch (error) {
        return NextResponse.json({ success: false, score: 0 }, { status: 200 });
      }
}