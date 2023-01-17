import React from 'react'
import Head from "next/head";

const Frame = ({ url, title }: { url: string, title: string }) => {
    const iframeRef = React.useRef<HTMLIFrameElement>(null);

    React.useEffect(() => {
        fetch(url)
        .then(res => res.text())
        .then(html => {
            const htmlElement = document.createElement('html');
            htmlElement.innerHTML = html;
            const favicon = htmlElement.querySelector('link[rel*="icon"]') as HTMLLinkElement;
            let faviconUrl: string | URL = favicon?.href as string;
            if (faviconUrl) {
                faviconUrl= url + new URL(faviconUrl as string).pathname;
                const faviconLink = document.createElement('link');
                faviconLink.rel = 'icon';
                faviconLink.href = faviconUrl;
                document.head.appendChild(faviconLink);
            }
        })
        .catch(err => {
            console.error(err);
        })
    }, [])



    const iFrameStyle = {
        width: '100%',
        height: '100%',
        border: 'none',
        overflow: 'auto',
        margin: '0',
        padding: '0',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: 1,
    } as React.CSSProperties;
    return (
        <>
        <Head>
            <title>{title}</title>
        </Head>
        <iframe src={url} style={iFrameStyle} ref={iframeRef} />
        </>
    )
}

export default Frame