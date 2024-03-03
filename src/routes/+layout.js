/** @type {import('./$types').PageLoad} */
export async function load({ url, params }) {
    const { category } = params
    
    return {
        url: url.pathname,
        category
    }
}