type StrapiResponse<T> = {
  data: T;
  message: string;
};

export interface Attribute {
	url: string;
	alternativeText?: any;
	caption?: any;
	width: number;
	height: number;
}

export interface Data {
	id: number;
	attributes: Attribute;
}

// export interface Picture {
// 	data: Data;
// }
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
export interface Button {
	id: number;
	url: string;
	newTab: boolean;
	text: string;
	type: string;
}

export interface ContentSection {
	id: number;
	__component: string;
	title: string;
	description: string;
	picture: Picture;
	buttons: Button[];
}

export interface Attribute {
	shortName: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	heading?: any;
	description?: any;
	contentSections: ContentSection[];
}

export interface Data {
	id: number;
	attributes: Attribute;
}

export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface Meta {
	pagination: Pagination;
}

export interface RootObject {
	data: Data[];
	meta: Meta;
}

  interface Checkbox {
	postext?: string;
	pretext?: string;
	linkText?: string;
  }
  
  interface Submit {
	text: string;
	type: string;
  }
  
  interface Modal {
	title: string;
	desc: string;
	cta_text: string;
	cta_Link: string;
  }
  
  export interface SignUpModal {
	Class: string;
	mobileImage: Picture;
	mainHeading: string;
	mainHeadingSubmited: string;
	whatLable: string;
	whenLable: string;
	whereLable: string;
	what: string;
	when: string;
	where: string;
	View_details: string;
	thankyouTitle: string;
	thankyouDesc: string;
	description: string;
	image: Picture;
	placeholderFour: string;
	formTitle: string;
	placeholderOne: string;
	placeholderOneErr: string;
	placeholderTwo: string;
	placeholderTwoErr: string;
	placeholderThree: string;
	placeholderThreeErr: string;
	placeholderFourErr: string;
	placeholderFiveErr: string;
	termsErrMsg: string;
	generalErrMsg: string;
	checkbox: Checkbox[];
	submit: Submit;
	modal: Modal;
	keepBrowsing: string;
	DOBhelptext: string;
  }