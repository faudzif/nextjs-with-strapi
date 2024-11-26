export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

export function getStrapiToken() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  return `${token}`;
}

export function getStrapiMediaURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL ||
    "https://storage.googleapis.com/qiddiya-sixflags-uat-media-bucket"
  }${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }
  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getStrapiMediaURL()}${url}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-UK", options);
}

export interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

export function HandleNullImage(image: Picture): string {
  if (
    image &&
    image.data &&
    image.data.attributes &&
    image.data.attributes.url
  ) {
    return getStrapiMedia(image.data.attributes.url) || "";
  }
  return "";
}

export function HandleNullImageALT(alt: Picture): string {
  if (
    alt &&
    alt.data &&
    alt.data.attributes &&
    alt.data.attributes.alternativeText
  ) {
    return getStrapiMedia(alt.data.attributes.alternativeText) || "";
  }
  return "";
}

export const pushDataLayer = (rest: any) => {
  window.dataLayer?.push({
    ...rest,
  });
};

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(1), time));
export function checkNull(check: any) {
  if (check === null) {
    return "";
  } else if (check === undefined) {
    return "";
  } else if (check === "") {
    return "";
  } else {
    return check;
  }
}

export const lowerNHyphenation = (str: string) => {
  return str.replace(/\s+/g, "-").toLowerCase();
};

export const addQueryString = (facetsName: any) => {
  // const params = new URLSearchParams(window.location.search);
  window.history.replaceState({}, '', `${window.location.pathname}?${facetsName}`);
};

export const removeQueryString = (
  facetsName: any,
  facetsValue: any,
  facetAllOption = false
) => {
  const params: any = new URLSearchParams(window.location.search);

  // console.log('facetsName : ', facetsName, ' , facetsValue : ', facetsValue, ' facetAllOption : ', facetAllOption);

  if (facetsValue == false) {
    params.delete(facetsName);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  } else {
    if (
      params.toString().length &&
      params.toString().indexOf(facetsName) !== -1
    ) {
      if (facetAllOption) {
        params.delete(facetsName);
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params}`
        );
      } else {
        const values = params.get(facetsName).split(",");
        const updatedValues = values.filter(
          (value: any) => value !== facetsValue
        );
        if (updatedValues.length > 0) {
          params.set(facetsName, updatedValues.join(","));
        } else {
          params.delete(facetsName);
        }
      }

      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params}`
      );
    }
  }
};
