import template from './templete/bookmark-item.hbs';
import *as storage from './services/storage.js';
import './styles.css';

const form = document.querySelector('.js-form');
const listUrl = document.querySelector('.js-url-list');
const input = document.querySelector('input');
const formButton = document.querySelector('.button');
const links = { linkSave: [] };
const persisted = storage.get();

if (persisted) {
    links.linkSave = persisted;
    render();
}


function addNew() {
    links.linkSave.push(input.value);
    storage.set(links.linkSave);
}

function handlerSubmit(evt) {
    evt.preventDefault();
    addNew();
    render();
    form.reset();
};

formButton.addEventListener('click', handlerSubmit);

function handlerDel(evt) {
    evt.preventDefault();
    // Делегирование события
    let listItem = evt.target.parentElement;;
    let updateStorage = storage.get().filter((el) => {
        return el != document.querySelector('.link').innerHTML.trim();
    });
    storage.set(updateStorage);
    listItem.remove();
}

document.querySelectorAll('.delBtn').forEach((el) => {
    el.addEventListener('click', handlerDel);
});

function render() {
    const markup = links.linkSave.reduce((acc, item) =>
        acc + template({
            link: item,
        }), '');
    listUrl.innerHTML = markup;
};