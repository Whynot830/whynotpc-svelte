import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const categoryName = params.category
    const response = await fetch(`http://localhost:8080/api/categories/${categoryName}`)
    
    let category
    if (response.ok) {
        category = (await response.json()).categories[0]
        return { category }
    }
    else 
        error(404, { message: `Category ${categoryName.toLocaleUpperCase()} does not exist`, fallbackUrl: '/catalog'})
}