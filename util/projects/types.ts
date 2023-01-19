export interface Project {
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

export interface IndexProps {
    params: any,
    projects: Project[]
}

export interface RouteType {
    mainCategory: string;
    symbol: string;
    version: string;
}