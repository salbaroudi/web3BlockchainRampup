const crypto = require("crypto")

export async function getRandomNumber() {
    return Math.floor(Math.random() * 10000 + 1)
}

export async function getRandomString() {
    return crypto.randomBytes(21).toString("hex")
}