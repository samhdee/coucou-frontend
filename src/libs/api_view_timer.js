const url = new URL(import.meta.env.HUB_URL);
url.searchParams.append('topic', 'https://example.com/books/1');

const eventSource = new EventSource(url);

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
};
