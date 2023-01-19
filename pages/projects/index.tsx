import { GetStaticProps } from 'next'
import Head from 'next/head'
import { app, getFirestore, doc, getDoc } from '../../util/firebase';
import { getRoutes } from '../../util/projects/paths';
import onImageLoadFail from '../../util/render/imageLoadFail';

interface Project {
    name: string,
    description: string,
    mainCategory: string,
    symbol: string,
    version: string,
    live: boolean,
    liveURL: string | null,
    github: boolean,
    githubURL: string | null,
    thumbnail: string | null,
    dateAdded: Date,
    authors: Record<string, string>[],
    tags: string[],
    languages: string[],
    technologies: Record<string, string[]>[]
}

interface IndexProps {
    params: any,
    projects: Project[]
}

export default function Index({ projects }: IndexProps) {
    return (
        <div style={{
            width: "clamp(300px, 80%, 800px)",
            margin: "0 auto"
        }}>
            <Head>
                <title>Projects</title>
                <meta name="description" content="Projects" />
            </Head>
            <h1>Projects</h1>
            <ul>
                {projects.map((project, index) => {
                    return (
                        <li key={index}>
                            <a href={"/projects/" + project.mainCategory + "/" + project.symbol + "/" + project.version}>
                                <img src={project.thumbnail ? project.thumbnail : ""} alt={project.name} onError={onImageLoadFail} height="150" width="150"/>
                                <h2>{project.name}</h2>
                                <p>{project.description}</p>
                                <div>
                                    Live: {project.live ? <a href
                                        ={project.liveURL ? project.liveURL : ""}> Live</a> : <span>Unavailble</span>}
                                    <br />
                                    Github: {project.github ? <a href
                                        ={project.githubURL ? project.githubURL : ""}>Github</a>  : <span>Unavailble</span>}
                                </div>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export const getStaticProps: GetStaticProps<IndexProps> = async (context) => {
    // get a list of all projects in the database
    // return the list of projects
    // if there are no projects, return 404
    const routes = await getRoutes();
    // get the document corresponding to each route
    const db = getFirestore(app);
    const projects: Project[] = [];
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const docRef = doc(db, 'projects', route.mainCategory, route.symbol, route.version);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data) {
                projects.push({
                    name: data.name? data.name : "",
                    description: data.description ? data.description : "",
                    mainCategory: data.mainCategory ? data.mainCategory : "",
                    symbol: data.symbol ? data.symbol : "",
                    version: data.version ? data.version : "",
                    live: data.live ? data.live : false,
                    liveURL: data.liveURL ? data.liveURL : null,
                    github: data.github ? data.github : false,
                    githubURL: data.githubURL ? data.githubURL : null,
                    thumbnail: "/images/projects/" + data.mainCategory + "-" + data.symbol + "-" + data.version + "-thumbnail.png",
                    dateAdded: data.dateAdded ? data.dateAdded : new Date(),
                    authors: data.authors ? data.authors : [],
                    tags: data.tags ? data.tags : [],
                    languages: data.languages ? data.languages : [],
                    technologies: data.technologies ? data.technologies : []
                })
            }
        }
    }
    return {
        props: {
            params: context.params ? context.params : null,
            projects: projects
        },
    }
}