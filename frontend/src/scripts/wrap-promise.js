// Variables we will use to replay state of fetch() promise to React
let status = 'pending';
let result;

// Fetch external data
export function fetchPosts(userId) {
    let url = `https://jsonplaceholder.typicode.com/posts`;
    let fetching = fetch(url)
        .then((res) => res.json())
        // Fetch request has gone well
        .then((success) => {
            status = 'fulfilled';

            result = success;
        })
        // Fetch request has failed
        .catch((error) => {
            status = 'rejected';

            result = error;
        });

    return () => {
        if (status === 'pending') {
            throw fetching; // Suspend(A way to tell React data is still fetching)
        } else if (status === 'rejected') {
            throw result; // Result is an error
        } else if (status === 'fulfilled') {
            return result; // Result is a fulfilled promise
        }
    };
}
