import Head from "next/head";
import { useEffect, useState } from "react";
function Error({ statusCode }: { statusCode: number }) {

    // This is a hack to make sure that the user is redirected to the home page
    // if they are on the 404 page and they click the back button if the history
    // is empty.
    const [destination, setDestination] = useState<() => void>(() => () => {
        history.go(-1);
    });
    useEffect(() => {
        if (history.length == 1) {
            setDestination(() => () => {
                window.location.href = "/";
            });
        }
    }, []);

    // Create different messages for different status codes
    const messages: Record<number, string> = {
        404: "Looks like you are lost in space.",
        500: "Looks like something went wrong on our end.",
        403: "Looks like you don't have permission to access this page.",
        401: "Looks like you are not logged in."
    };

    return (
        <>
            <Head>
                <title>Error {statusCode} - Omar Ibrahim</title>
                <link href="/legacy/css/404.css" rel="stylesheet"></link>
            </Head>
            <div className="body">
                <div className="position-relative space absolute">
                    <img src="/legacy/images/404/space.svg"/>
                    <div className="typewriter absolute text">
                        <p className="text-white">{messages.hasOwnProperty(statusCode) ? messages[statusCode] : messages[404]}</p>
                    </div>
                </div>
                <h1 className="absolute error">{statusCode}</h1>

                <img src="/legacy/images/404/aster.svg" className="absolute aster" />
                <img src="/legacy/images/404/g1.svg" className="absolute gear-left" />
                <img src="/legacy/images/404/g2.svg" className="absolute gear-right" />
                <div className="absolute go-back center-mobile">
                    <a
                        href="javascript:void(0);"
                        onClick={destination}
                        className="scroll">
                        <div className="btn-container margin-5" id="btn-cv">
                            <div className="btn" data-title="Go Back ←" />
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}

Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
