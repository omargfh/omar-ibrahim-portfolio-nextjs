import { app, getFirestore, collection, getDocs, getDoc, doc } from '../../../../../util/firebase';
import { GetStaticPaths } from 'next';
import { getStaticPaths } from '../../../../../util/projects/paths';

interface ProjectIndexProps {
    params: {
        mainCategory: string;
        symbol: string;
        version: string;
    }
}

export default function ProjectIndex({ params }: ProjectIndexProps) {

    return (
        <div>
            <h1>Project Index</h1>
            <p>mainCategory: {params.mainCategory}</p>
            <p>symbol: {params.symbol}</p>
            <p>version: {params.version}</p>
        </div>
    )
}

// `getStaticPaths`, from import
export {
    getStaticPaths
}


// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
    return {
        // Passed to the page component as props
        props: {
            params: context.params
        },
    }
}