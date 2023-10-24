import React, { memo } from 'react';

import { fetchPosts } from '~/scripts/wrap-promise';

const postsData = fetchPosts();
console.log(postsData);

const ContactComponent = () => {
    //* INITIAL_FETCH
    const posts = postsData();
    console.log('posts', posts);
    return (
        <>
            <div>ContactComponent</div>
            <h1>hello there abhay rana</h1>
        </>
    );
};

export default memo(ContactComponent);
