import { createTheme } from '@mui/material/styles'


import { Noto_Sans } from "next/font/google"

const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});


declare module '@mui/material/styles' {
    interface TypographyVariants {
        cardHeader: React.CSSProperties;
        cardSubheader: React.CSSProperties;
        navbar: React.CSSProperties;
        search: React.CSSProperties;
    }

    // allow configuration using `createTheme()`
    interface TypographyVariantsOptions {
        cardHeader?: React.CSSProperties;
        cardSubheader?: React.CSSProperties;
        navbar?: React.CSSProperties;
        search?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        cardHeader: true;
        cardSubheader: true;
        navbar: true;
        search: true;
    }
}

export const theme = createTheme({
    palette: {
        common: {
            white: "#EFEFEF",
            black: "#343434",
        },
        primary: {
            main: '#7E72FF',
            contrastText: "#EFEFEF",
        },
        secondary: {
            main: '#FFA75A',
            contrastText: "#EFEFEF",
        },
        error: {
            main: '#FF5656',
            contrastText: "#EFEFEF",
        },
        warning: {
            main: '#FFF876',
            contrastText: "#343434",
        },
        success: {
            main: '#69AD56',
            contrastText: "#EFEFEF",
        },
    },

    typography: {
        fontFamily: notoSans.style.fontFamily,
        cardHeader: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        cardSubheader: {
            fontSize: '1.6rem'
        },
        navbar: {
            fontSize: '1.6rem'
        },
        search: {
            fontSize: '1.2rem'
        },
        button: {
            fontWeight: 700,
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 30,
                    paddingLeft: 20,
                    paddingRight: 20,
                    fontWeight: 400,
                    textTransform: 'none',
                },
            },
        },
        // MuiPaper: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: 12,
        //             padding: 16,
        //         },
        //     },
        // },
    },
})
