const isValidName = (name: string) => {
    // Allow alphabetical characters, spaces, hyphens, and apostrophes
    const nameRegex = /^[A-Za-z\u00C0-\u017F '-]+$/
    return nameRegex.test(name)
}

const isValidEmail = (email: string) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const isValidPassword = (password: string) => {
    // Password should be at least 8 characters long
    // Should contain at least one uppercase letter, one lowercase letter, one number,
    // and allowed special characters: @$!%*?&
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}

function isSixDigit(code: string) {
    // value is a 6-digit number
    return /^\d{6}$/.test(code);
}

type paramsType = {
    type: 'name' | 'email' | 'password' | 'code',
    value: string,
}

export function verifyData(params: paramsType) {

    switch (params.type) {
        case 'name':
            return isValidName(params.value)
        case 'email':
            return isValidEmail(params.value)
        case 'password':
            return isValidPassword(params.value)
        case 'code':
            return isSixDigit(params.value)
    }

}
