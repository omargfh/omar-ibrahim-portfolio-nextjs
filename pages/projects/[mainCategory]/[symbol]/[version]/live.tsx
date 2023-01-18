import { getStaticPaths } from "../../../../../util/projects/paths";
import { app, getFirestore, doc, getDoc, collection} from "../../../../../util/firebase";
import Frame from "../../../../../components/Frame";

export default function Live({ params }: any) {
    return (
        <Frame
            title={`${params.name} Live Demo - Omar Ibrahim`}
            url={params.liveURL}
        />

    )
}

// `getStaticPaths`, from import
export {
   getStaticPaths
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
    // initialize the project
    const db = getFirestore(app);
    const projectRef = doc(db, 'projects', context.params.mainCategory, context.params.symbol, context.params.version);
    const data = await (await getDoc(projectRef)).data();
    const liveURL = data?.live as string;
    const name = data?.name as string;
    if (!liveURL) {
        return {
            notFound: true
        }
    }
    return {
        // Passed to the page component as props
        props: {
            params: {...context.params, liveURL, name}
        },
    }
}