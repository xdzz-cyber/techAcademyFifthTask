"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getPostsButton = document.querySelector(".getPostsButton");
const getNewArrayButton = document.querySelector(".getNewArrayButton");
const newArrayValue = document.querySelector(".newArrayValue");
const objectShapes = [
    { id: 1, name: 'f' },
    { id: 2, name: 's' },
    { id: 3, name: 't' },
];
class FirstTask {
    static getAndRenderPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts');
            const posts = yield response.json();
            // Slice to get first 5 posts
            const slicedPosts = posts.slice(0, 5);
            const container = document.createElement('div');
            slicedPosts.forEach((post) => {
                const postElem = document.createElement('div');
                postElem.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <p>By user ${post.userId}</p>
      `;
                container.appendChild(postElem);
            });
            document.body.appendChild(container);
        });
    }
}
class SecondTask {
    static updateObjectInArray(initialArray, key, value, patch) {
        const indexToUpdate = initialArray.findIndex((item) => item[key] === value);
        if (indexToUpdate === -1) {
            // key value not found, return the original array
            return initialArray;
        }
        const updatedItem = Object.assign(Object.assign({}, initialArray[indexToUpdate]), patch);
        const updatedArray = [...initialArray];
        updatedArray[indexToUpdate] = updatedItem;
        return updatedArray;
    }
}
class Work {
    static bindEvents() {
        getPostsButton === null || getPostsButton === void 0 ? void 0 : getPostsButton.addEventListener("click", FirstTask.getAndRenderPosts);
        getNewArrayButton === null || getNewArrayButton === void 0 ? void 0 : getNewArrayButton.addEventListener("click", () => {
            const updatedArray = SecondTask.updateObjectInArray(objectShapes, 'id', 2, { name: 'yeah' });
            Work.renderResult(updatedArray);
        });
    }
    static renderResult(updatedArray) {
        if (newArrayValue) {
            newArrayValue.textContent = JSON.stringify(updatedArray);
        }
    }
    static init() {
        Work.bindEvents();
        Work.renderResult(objectShapes);
    }
}
Work.init();
