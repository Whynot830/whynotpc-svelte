import { error } from "@sveltejs/kit";
/** @type {import("./$types").PageLoad} */
export async function load({ params, fetch }) {
    const { productId } = params

    const getProduct = async (id) => {
        console.log("Fetching product");
        const response = await fetch("http://localhost:8080/api/products/" + id)
        if (!response.ok)
            error(404, { message: "Product not found", fallbackUrl: '/catalog' });
        return response.json()
        // return await response.json()
    };
    const getImage = async (product) => {
        console.log("Fetching product's image");

        const response = await fetch(`http://localhost:8080/api/images/${product.imgName}`);

        if (!response.ok)
            return {
                imgUrl: null
            };
        const imgData = await response.blob();
        const imgUrl = URL.createObjectURL(imgData);
        return {
            imgUrl
        };

    };
    const fetchedProduct = await getProduct(productId)
    return {
        fetchedProduct: fetchedProduct,
        lazy: {
            imgUrl: getImage(fetchedProduct.products[0])
        }
    }
}