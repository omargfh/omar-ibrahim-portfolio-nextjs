import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { app, getFirestore, doc, getDoc } from '../../../util/firebase';
import { getRoutes, RouteType } from '../../../util/projects/paths';
import onImageLoadFail from '../../../util/render/imageLoadFail';
import { Project, IndexProps } from '../../../util/projects/types';

export default function Index({ projects }: IndexProps) {
    return (
        <>
        <Head>
            <title>Projects - Omar Ibrahim</title>
            <meta name="description" content="Projects" />
        </Head>
        <div style={{
            width: "clamp(300px, 80%, 800px)",
            margin: "0 auto"
        }}>
            <h1>{projects[0].mainCategory.split('').map((e: string, i: number) => i == 0 ? e.toUpperCase() : e).join('') ?? ""}</h1>
            <ul>
                {projects.map((project, index) => {
                    return (
                        <li key={index}>
                            <a href={"/projects/" + project.mainCategory + "/" + project.symbol + "/" + project.version}>
                                <img src={project.thumbnail ? project.thumbnail : ""} alt={project.name} onError={onImageLoadFail} height="150" width="150"/>
                                <h2>{project.name}</h2>
                                <p>{project.description}</p>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}

export const getStaticProps: GetStaticProps<IndexProps> = async (context) => {
    // get a list of all projects in the database
    // return the list of projects
    // if there are no projects, return 404
    let routes: RouteType[] = await getRoutes();
    routes = routes.filter((route: RouteType) => route.mainCategory === context?.params?.mainCategory)
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

export const getStaticPaths: GetStaticPaths<{mainCategory: string}> = async () => {
    // Get the project data from the database
    const routes: RouteType[] = await getRoutes();
    let categories: Set<string> = new Set();
    routes.forEach((route: RouteType) => {
        categories.add(route.mainCategory);
    });
    console.log(categories)
    return {
        paths: Array.from(categories).map((category: string) => {
            return {
                params: {
                    mainCategory: category
                }
            }
        }),
        fallback: false
    }
}