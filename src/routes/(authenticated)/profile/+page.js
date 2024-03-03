import { redirect } from "@sveltejs/kit";
export const load = async ({ fetch }) => {
    console.log('Fetching user');
    const response = await fetch("http://localhost:8080/api/users/current",
        {
            credentials: 'include'
        })
    if (!response.ok)
        redirect(303, '/auth?redirect=profile');

    const data = await response.json()
    return { user: data.users[0] }
}