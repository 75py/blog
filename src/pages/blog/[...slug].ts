import type {APIContext} from 'astro';
import {getCollection} from 'astro:content';
import {OgImageGenerator} from '../../components/OgImageGenerator';

export async function getStaticPaths() {
    const posts = await getCollection('blog');
    // console.log(posts)
    return posts.map((post) => ({
        params: {slug: post.slug + '/ogp.png'},
        props: post,
    }));
}

export async function GET({params}: APIContext) {
    const {slug} = params;
    if (!slug) return {status: 404};

    const posts = await getStaticPaths();
    const post = posts.find((post) => post.params.slug === slug);
    if (!post) return {status: 404};

    const title = post.props.data?.title
    const heroImage = post.props.data.heroImage?.src
    if (!title || !heroImage) return {status: 404};

    const png = await new OgImageGenerator().generate(title, heroImage);
    return new Response(png, {
        headers: {
            "Content-Type": "image/png"
        }
    })
}
