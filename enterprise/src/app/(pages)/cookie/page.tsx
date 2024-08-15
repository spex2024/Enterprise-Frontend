
import { cookies } from 'next/headers'

export default function Page() {
    const cookieStore = cookies()
    console.log(cookieStore)
    return cookieStore.getAll().map((cookie) => (
        <div key={cookie.name}>
            <p>Name: {cookie.name}</p>
            <p>Value: {cookie.value}</p>
        </div>
    ))
}