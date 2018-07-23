export const loadAuthToken = () => {
    return localStorage.getItem('p8s4a9Token');
};

export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('p8s4a9Token', authToken);
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('p8s4a9Token');
    } catch (e) {}
};