export const set = value => {
    localStorage.setItem('url-finder', JSON.stringify(value));
}

export const get = () => {
    const date = localStorage.getItem('url-finder');

    return date ? JSON.parse(date) : null;
}