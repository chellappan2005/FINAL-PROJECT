// eslint-disable-next-line no-undef
// export const BASE_API = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://easylife123.herokuapp.com";
export const BASE_API =  "https://easylife123.herokuapp.com";

export const FETCH_ALL_PRICES_URL = `${BASE_API}/info/get_all_prices`;
export const FETCH_OFFERS_URL = `${BASE_API}/info/get_offers`;
export const SUBMIT_CART_URL = `${BASE_API}/cart/submit`;
export const CART_TOTAL_URL = `${BASE_API}/cart/getTotal`;

export const CUST_LOGIN_URL = `${BASE_API}/cust/login`;
export const CUST_SIGNUP_URL = `${BASE_API}/cust/sign_up`;
