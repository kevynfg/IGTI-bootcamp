function leftPad(value, count = 2, char = '0') {
    let stringValue = value.toString()
    let newValue = stringValue

    if (stringValue < count) {
        for (let i = 0; i < count - stringValue.length; i++) {
            newValue = char + stringValue
        }
    }

    return newValue
}

function getNewTimeStamp() {
    const now = new Date()
    let result = '';

    result += leftPad(now.getDate())
    result += '/';
    result += leftPad(now.getMonth())
    result += '/';
    result += now.getFullYear()
    result += ' ';
    result += leftPad(now.getHours())
    result += ':';
    result += leftPad(now.getMinutes())
    result += ':';
    result += leftPad(now.getSeconds())
    result += '.';
    result += leftPad(now.getMilliseconds())

    return result
}