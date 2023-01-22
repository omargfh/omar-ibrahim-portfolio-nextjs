import { useEffect } from "react";
// @ts-ignore
import * as Babel from "@babel/standalone";

interface ModuleCapsuleProps {
    html?: string,
    css?: string,
    sass?: boolean,
    js?: string,
    jsx: boolean
}

const ModuleCapsule = ({ html, css, sass, js, jsx }: ModuleCapsuleProps) => {
    // This capsule overrides the default space. Use carefully.
    useEffect(() => {
        // Injects HTML and Js into DOM
        function injectHTML() {
            // override body
            const htmlEl = document.createElement("html")
            htmlEl.innerHTML = html ?? ""
            const body = document.getElementsByTagName("body")[0]
            body.innerHTML = htmlEl.getElementsByTagName("body")[0].innerHTML

            // remove next.js script
            const nextScript = document.getElementById("__next")
            nextScript?.remove()
            const del = Array.from(document.querySelectorAll("script")).forEach((s) => s.remove())

            // jsx
            const script = document.createElement("script")
            script.type = "module"
            if (jsx)
                script.innerHTML = Babel.transform(js ?? "", { presets: ["react"] }).code
            else
                script.innerHTML = js ?? ""
            body.appendChild(script)
        }

        // override head
        const htmlEl = document.createElement("html")
        htmlEl.innerHTML = html ?? ""
        const head = document.getElementsByTagName("head")[0]
        head.innerHTML = htmlEl.getElementsByTagName("head")[0].innerHTML
        const style = document.createElement("style")

        // remove all stylesheets
        const del = [
            ...Array.from(document.querySelectorAll("style")),
            ...Array.from(document.querySelectorAll("link[rel=stylesheet]"))
        ].forEach((s) => s.remove())

        // inject css
        if (!sass) {
            style.innerHTML = css ?? ""
            style.innerHTML += `
                .loading {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    font-family: "Arial";
                    background: #111;
                }

                .loading .loading__spinner {
                    width: 50px;
                    height: 50px;
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #ff1111;
                    border-radius: 50%;
                    animation: spint 2s linear infinite;
                }

                @keyframes spint {
                    0% {
                    transform: rotate(0deg);
                    }
                    100% {
                    transform: rotate(360deg);
                    }
                }
            `
            head.appendChild(style)
            injectHTML()
        }
        else {
            // compile sass in the browser
            const sassScript = document.createElement("script")
            sassScript.src = "https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.10.11/sass.sync.min.js"
            head.appendChild(sassScript)
            sassScript.onload = () => {
                // @ts-ignore
                Sass.compile(css ?? "", (compiled: any) => {
                    style.innerHTML = compiled.text
                    head.appendChild(style)
                    injectHTML()
                });
            }
        }
    }, [])
    return (
        <div className="loading">
            <div className="loading__spinner"></div>
        </div>
    )
}

export default ModuleCapsule