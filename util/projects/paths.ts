import { GetStaticPaths } from 'next';
import { app, getFirestore, doc, getDoc } from '../firebase';

export interface RouteType {
    mainCategory: string;
    symbol: string;
    version: string;
}

export const getRoutes: () => Promise<RouteType[]> = async () => {
    // Get the project data from the database
    const db = getFirestore(app);
    // fetch projects/routes from database
    const routes = await getDoc(doc(db, "projects", "routes"));
    if (routes.exists()) {
        const routesData = routes.data()['active-routes'];
        return routesData;
    }
    return [];
}

export const getStaticPaths: GetStaticPaths<any> = async () => {
    // Get the project data from the database
    const routes: RouteType[] = await getRoutes();
    if (routes.length > 0) {
        const routesData = routes;
        return {
            paths: routesData.map((route: RouteType) => ({
                params: {
                    mainCategory: route.mainCategory,
                    symbol: route.symbol,
                    version: route.version
                }
            })),
            fallback: false
        }
    }
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: false //indicates the type of fallback
    }
}