import { app, getFirestore, collection, getDocs, getDoc, doc } from '../../../../../../util/firebase';
import { GetStaticPaths } from 'next';
import { getStaticPaths as gsp, RouteType } from '../../../../../../util/projects/paths';
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
import html from 'remark-html';

export default function ProjectIndex(props: any) {
    return (
        <div>
            { props.article.data.title }
            <br />
            { props.article.data.id }
            <br />
            { new Date(props.article.data.date).toLocaleDateString() }
            <br />
            <div dangerouslySetInnerHTML={{ __html: props.article.content }} />
        </div>
    )
}

// `getStaticPaths`, from import
export const getStaticPaths: GetStaticPaths<any> = async () => {
    const docsDirectory = path.join(process.cwd(), 'assets/docs/projects')
    const filenames = await fs.readdir(docsDirectory);

    const paths = filenames.map(filename => {
        const [mainCategory, symbol, version, articleId] = filename.split('-');
        return {
            params: {
                mainCategory,
                symbol,
                version,
                articleId: articleId.split('.')[0]
            }
        }
    });

    return {
        paths,
        fallback: false
    }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
    // look up "{mainCategory}-{symbol}-{version}-{articleId}.md" in
    // ./assets/docs/projects
    // if it exists, return the markdown
    // if it doesn't exist, return 404
    const docsDirectory = path.join(process.cwd(), 'assets/docs/projects')
    const filenames = await fs.readdir(docsDirectory);

    const $c = context.params;
    const filename = `${$c.mainCategory}-${$c.symbol}-${$c.version}-${$c.articleId}.md`;
    if (!filenames.includes(filename)) {
        return {
            notFound: true
        }
    }
    const fileContent = await fs.readFile(path.join(docsDirectory, filename), 'utf8');
    const matterResult = matter(fileContent);
    const htmlContent = await remark().use(html).process(matterResult.content);
    return {
        // Passed to the page component as props
        props: {
            params: context.params,
            article: {
                content: htmlContent.toString(),
                data: matterResult.data
            }
        },
    }
}