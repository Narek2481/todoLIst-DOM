export class Requests {
    constructor() { }
    static async getMyPosts(url) {
        try {
            const response = await fetch(url);
            if (response.status !== 200) {
                throw Error("get request failed")
            }
            return response.json()
        } catch (error) {
            throw e
        }
        return
    }
    static async postPosts(url, data) {
        try {
            const postRequest = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            if (postRequest.status === 201) {
                return await postRequest.json()
            } else {
                throw Error("something went a wrong")
            }
        } catch (e) {
            throw e
        }
    }
    static async putPosts(url, body) {
        try {
            const putRequest = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            if (putRequest.status === 200) {
                return await putRequest.json()
            } else {
                throw Error("something went a wrong")
            }
        } catch (e) {
            throw e
        }
    }
    static async deletePosts(url, postId) {
        try {
            const response = await fetch(url+"/"+postId, {
                method: 'DELETE',
            });
            return await response.json()
        } catch (e) {
            throw e
        }

    }
}