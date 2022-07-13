export default async (method, url) => {
    return await fetch(url, { method })
}