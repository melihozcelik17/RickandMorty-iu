
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Component {...pageProps} />
        </ThemeProvider>

    );
};

export default MyApp;
