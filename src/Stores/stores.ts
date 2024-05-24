import {writable} from "svelte/store";

export const storedUsername = localStorage.getItem("user-name");
export const storedUserId = localStorage.getItem("user-id");


function persistentStore(key, initialValue) {
    const storedValue = localStorage.getItem(key);
    const data = storedValue ? JSON.parse(storedValue) : initialValue;
    const store = writable(data);

    store.subscribe((value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return store;
}

export const isLoggedIn = writable<boolean>(isAuthenticated());
export const showNewCourse = writable(false);
export const selectedCourseId = writable<string | null>(null);

export const selectedCourse = writable<any | null>(null);

export const showCourseDetails = writable(false)

export const showEditCourse = writable(false)

function isAuthenticated(): boolean {
    return localStorage.getItem("jwt-token") !== null;
}
