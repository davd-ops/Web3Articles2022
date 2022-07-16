import {server} from "../config"

export default async function logout() {
    await fetch(`${server}/api/auth/logout`)
}