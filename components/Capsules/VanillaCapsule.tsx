import { useEffect } from "react";

interface VanillaCapsuleProps {
    html?: string,
    css?: string,
    sass?: boolean,
    js?: string
}

const VanillaCapsule = ({ html, css, sass, js }: VanillaCapsuleProps) => {
    // This capsule overrides the default space. Use carefully.
    useEffect(() => {
        // Injects HTML and Js into DOM
        function injectHTML() {
            // override body
            const body = document.getElementsByTagName("body")[0]
            body.innerHTML = html ?? ""

            // remove next.js script
            const nextScript = document.getElementById("__next")
            nextScript?.remove()
            const del = Array.from(document.querySelectorAll("script")).forEach((s) => s.remove())

            // append script
            const script = document.createElement("script")
            script.innerHTML = js ?? ""
            head.appendChild(script)
        }

        // override head
        const head = document.getElementsByTagName("head")[0]
        const style = document.createElement("style")

        // remove all stylesheets
        const del = [
            ...Array.from(document.querySelectorAll("style")),
            ...Array.from(document.querySelectorAll("link[rel=stylesheet]"))
        ].forEach((s) => s.remove())

        // inject css
        if (!sass) {
            style.innerHTML = css ?? ""
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
        <></>
    )
}

export default VanillaCapsule