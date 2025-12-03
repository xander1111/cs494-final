const colorMap: {[key: string]: 'primary' | 'secondary' | 'error' | 'success'} = {
    "Total": 'error',

    // Corners
    "U-Up, D-Side": 'success',
    "U-Up, D-Down": 'success',
    "D-Down, D-Down": 'success',
    "D-Side, D-Side": 'secondary',
    "LFU/BRU, D-Any": 'secondary',
    "U-Side, D-Any": 'secondary',
    "D-Side, D-Down": 'secondary',
    "U-Any, U-Any": 'primary',
    "Special": 'primary',

    // Edges
    "4 Move": 'success',
    "5 Move": 'success',
    "M-Swap": 'secondary',
    "U-Swap": 'secondary',
    "E-Swap": 'secondary',
    "S-Swap": 'secondary',
    "F-Swap": 'secondary',
    "D-Swap": 'secondary',
    "S-Insert": 'secondary',
    "Algorithm": 'primary',
}

const cornerCategories: {[key: string]: number} = {
    "U-Up, D-Side": 48,
    "U-Up, D-Down": 24,
    "D-Down, D-Down": 12,
    "D-Side, D-Side": 48,
    "LUF/URB, D-Any": 48,
    "U-Side, D-Any": 96,
    "D-Side, D-Down": 48,
    "U-Any, U-Any": 54,
    "Total": 378,
}

const edgeCategories: {[key: string]: number} = {
    "4 Move": 152,
    "M-Swap": 86,
    "U-Swap": 76,
    "E-Swap": 42,
    "S-Swap": 36,
    "F-Swap": 16,
    "S-Insert": 8,
    "Algorithm": 24,
    "Total": 440,
}

export function getColorForCategory(category: keyof typeof colorMap): 'primary' | 'secondary' | 'error' | 'success' {
    return colorMap[category]
}

export function getCategories(type: string) {
    return type == 'corner' ?
        cornerCategories
        :
        edgeCategories
}
