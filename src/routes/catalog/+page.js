/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const response = await fetch('http://localhost:8080/api/categories')
    const { categories } = await response.json()

    return { categories }
}