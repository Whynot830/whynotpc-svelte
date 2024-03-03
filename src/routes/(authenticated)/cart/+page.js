import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    console.log('Fetching cart');

    const response = await fetch("http://localhost:8080/api/cart",
        {
            method: 'GET',
            credentials: 'include'
        })
    if (response.status === 401)
        redirect(303, '/auth?redirect=cart');

    const data = await response.json()
    return { fetchedCart: data.cart }
}