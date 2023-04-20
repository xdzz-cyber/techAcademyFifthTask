const getPostsButton = document.querySelector(".getPostsButton");
const getNewArrayButton = document.querySelector(".getNewArrayButton");
const newArrayValue = document.querySelector(".newArrayValue");

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type ObjectShape = {
    id: number;
    name: string;
};

const objectShapes: ObjectShape[] = [
    { id: 1, name: 'f' },
    { id: 2, name: 's' },
    { id: 3, name: 't' },
];

class FirstTask {
    static async getAndRenderPosts(): Promise<void> {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts: Post[] = await response.json();

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
    }
}

class SecondTask {
    static updateObjectInArray<ObjectShape>(
        initialArray: ObjectShape[],
        key: keyof ObjectShape,
        value: number | string,
        patch: Partial<ObjectShape>
    ): ObjectShape[] {
        const indexToUpdate = initialArray.findIndex((item) => item[key] === value);

        if (indexToUpdate === -1) {
            // key value not found, return the original array
            return initialArray;
        }

        const updatedItem = { ...initialArray[indexToUpdate], ...patch };
        const updatedArray = [...initialArray]
        updatedArray[indexToUpdate] = updatedItem;

        return updatedArray;
    }
}

class Work {
    static bindEvents() {
        getPostsButton?.addEventListener("click", FirstTask.getAndRenderPosts);
        getNewArrayButton?.addEventListener("click", () => {
            const updatedArray = SecondTask.updateObjectInArray<ObjectShape>(
                objectShapes,
                'id',
                2,
                { name: 'yeah' }
            );
            Work.renderResult(updatedArray);
        });
    }

    static renderResult(updatedArray: ObjectShape[]) {
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
