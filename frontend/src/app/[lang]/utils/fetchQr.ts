export default async function fetchRidesQRJson() {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || 'https://your-strapi-domain.com/uploads/rides-qr.json'; // Update with your actual URL
  
    try {
      const response = await fetch(strapiUrl);
      if (!response.ok) {
        console.error("Failed to fetch rides-qr.json:", response.status, response.statusText);
        throw new Error(`Failed to fetch rides-qr.json from Strapi. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching or processing rides-qr.json:", error);
      throw error;
    }
  }