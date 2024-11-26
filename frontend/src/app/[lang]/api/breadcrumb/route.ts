import { NextResponse } from "next/server";
import { getStrapiURL } from "../../utils/api-helpers";
export async function GET(request: Request, response: Response) {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
        const lang = request.url.split("/").at(3)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions: any = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
            next: { revalidate: 3600 }
        };
        if (lang === 'ar') {
            const res = await fetch(getStrapiURL(`/api/global?locale=ar`), requestOptions)
                .then((response: any) => { return response })
                .catch((error) => console.error(error));
            const data = await res.json();
            const { Google_reCaptcha_Site_key, Google_reCaptcha_Secret_key, ...updatedAttributes } = data.data.attributes;
            data.data.attributes = updatedAttributes;
            return NextResponse.json(data);
            return res;
        } else {
            const res = await fetch(getStrapiURL(`/api/global?locale=en`), requestOptions)
                .then((response: any) => { return response })
                .catch((error) => console.error(error));
            const data = await res.json();
            const { Google_reCaptcha_Site_key, Google_reCaptcha_Secret_key, ...updatedAttributes } = data.data.attributes;
            data.data.attributes = updatedAttributes;
            return NextResponse.json(data);
        }

    } catch (error) {
        return NextResponse.json({ success: false, score: 0 }, { status: 200 });
    }
}