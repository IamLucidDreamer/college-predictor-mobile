import { serverUnauth } from "../helpers/apiCall";

export const signup = async (email, password) => await new Promise((resolve, reject) => {
    serverUnauth
        .post('/signup', {
            email: email,
            password: password,
        })
        .then((response) => {
            resolve(response);
        })
        .catch(reject);
});

export const login = async (email, password) => await new Promise((resolve, reject) => {
    console.log("service");
    serverUnauth
        .post('/signin', {
            email: email,
            password: password,
        })
        .then((response) => {
            console.log("hi");
            resolve(response);
        })
        .catch(reject);
        console.log("hsdfa");
});