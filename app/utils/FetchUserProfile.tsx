import { urls } from '@/app/config/urls'

const FetchUserProfile = async (username: string) => {
    try {
        const result = await fetch(urls.publicProfile, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({ username }),
        })
        const data = await result.json()
        return data
    } catch (e) {
        console.error(e)
    }
}

export default FetchUserProfile
