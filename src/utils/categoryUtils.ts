const colorMap: {[key: string]: 'primary' | 'secondary' | 'error' | 'success'} = {
    "Total": 'error',

    // Corners
    "U-Top, D-Side": 'success',
    "U-Top, D-Bottom": 'success',
    "D-Bottom, D-Bottom": 'success',
    "D-Side, D-Side": 'secondary',
    "LUF/UBR, D-Any": 'secondary',
    "U-Side, D-Any": 'secondary',
    "D-Side, D-Bottom": 'secondary',
    "U-Any, U-Any": 'primary',

    // Edges
    "4-Mover": 'success',
    "M-Swap": 'secondary',
    "U-Swap": 'secondary',
    "E-Swap": 'secondary',
    "S-Swap": 'secondary',
    "F-Swap": 'secondary',
    "S-Insert": 'secondary',
    "Alg": 'primary',
}

export const cornerCategories = {
    "U-Top, D-Side": 48,
    "U-Top, D-Bottom": 24,
    "D-Bottom, D-Bottom": 12,
    "D-Side, D-Side": 48,
    "LUF/UBR, D-Any": 48,
    "U-Side, D-Any": 96,
    "D-Side, D-Bottom": 48,
    "U-Any, U-Any": 54,
    "Total": 378,
}

export const edgeCategories = {
    "4-Mover": 152,
    "M-Swap": 86,
    "U-Swap": 76,
    "E-Swap": 42,
    "S-Swap": 36,
    "F-Swap": 16,
    "S-Insert": 8,
    "Alg": 24,
    "Total": 440,
}

export function getColorForCategory(category: keyof typeof colorMap): 'primary' | 'secondary' | 'error' | 'success' {
    return colorMap[category]
}
