// import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
// import { addParameters } from '@storybook/react';
import 'tailwindcss/tailwind.css';

// addParameters({
//     docs: {
//         container: DocsContainer,
//         page: DocsPage,
//     },
// });

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

// Decorators global style
// export const decorators = [
//     (Story) => (
//         <div style={styles}>
//             <Story />
//         </div>
//     ),
// ];

export default preview;
