import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {store} from "../../store";
import theme from "@/theme";
import {ThemeProvider} from "@mui/material";
import {GOOGLE_CLIENT_ID} from "../../constants";

export default function App({Component, pageProps}: AppProps) {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </Provider>
        </GoogleOAuthProvider>
    )
}
