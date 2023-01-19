import React from 'react'

import VanillaCapsule from '../../components/Capsules/VanillaCapsule';
import ReactCapsule from '../../components/Capsules/ReactCapsule';

import { promises as fs } from 'fs'
import path from 'path'
import { GetStaticPaths } from 'next';

const Color = ({ html, css, sass, js, capsuleType } : any) => {
    return (
        <>
            {/* Vanilla Capsule */}
            {
                capsuleType === "vanilla"
                    && <VanillaCapsule html={html} css={css} sass={sass} js={js} />
            }
            {/* React capsule */}
            {
                capsuleType === "react"
                    && <ReactCapsule html={html} css={css} sass={sass} js={js} />

            }
        </>
    )
}

export const getStaticProps = async (context: any) => {
    const manifest = await JSON.parse(await fs.readFile(path.join(process.cwd(), `assets/hosted/${context?.params?.hostname}/manifest.json`), 'utf8'));
    const html = await fs.readFile(path.join(process.cwd(), `assets/hosted/${context?.params?.hostname}/${manifest['html']}`), 'utf8');
    const css = await fs.readFile(path.join(process.cwd(), `assets/hosted/${context?.params?.hostname}/${manifest['css']}`), 'utf8');
    const sass = manifest['sass'];
    const js = manifest['js'].length > 0 ? await fs.readFile(path.join(process.cwd(), `assets/hosted/${context?.params?.hostname}/${manifest['js']}`), 'utf8') : "";
    const capsuleType = manifest['capsule'];
    return {
        props: {
            html,
            css,
            sass,
            js,
            capsuleType
        }
    }
}

export const getStaticPaths: GetStaticPaths<{ hostname: string }> = async (context) => {
    const docsDirectory = path.join(process.cwd(), 'assets/hosted')
    const filenames = await fs.readdir(docsDirectory);
    const paths: {params: any}[] = []
    for (const filename of filenames) {
        const manifest = await fs.readFile(path.join(docsDirectory, filename, 'manifest.json'), 'utf8');
        const manifestJSON = await JSON.parse(manifest);
        if (manifestJSON['include']) {
            paths.push({
                params: {
                    hostname: filename
                }
            })
        }
    };
    return {
        paths: paths.filter((path: any) => path !== null),
        fallback: false
    }
}

export default Color