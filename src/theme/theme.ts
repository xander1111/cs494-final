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
        background: {
            default: "#EFEFEF",
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
            fontSize: '1.2rem',
            fontWeight: 600,
        },
        cardSubheader: {
            fontSize: '1rem'
        },
        navbar: {
            fontSize: '1.2rem'
        },
        search: {
            fontSize: '0.7rem'
        },
        // button: {
        //     fontWeight: 700,
        // },
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
                    height: '2.5rem',
                    margin: '0.5rem',
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    width: '100%',
                    borderBottomWidth: '0.15rem',
                }
            }
        },
        MuiStack: {
            defaultProps: {
                spacing: 1
            },
            styleOverrides: {
                root: {
                    alignItems: 'center',
                }
            }
        }
    },
})
