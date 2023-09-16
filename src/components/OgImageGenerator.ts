import {readFile} from "fs/promises";
import shape from "sharp";
import {resolve} from "path";
import satori from "satori";
import {Resvg} from "@resvg/resvg-js";

export class OgImageGenerator {

    async generate(title: string, heroImage: string) {
        const svg = await this.createOpgSvg(title, this.optimizePath(heroImage));
        return new Resvg(svg).render().asPng();
    }

    private optimizePath(path: string) {
        if (import.meta.env.MODE === 'production') {
            return resolve(process.cwd(), 'dist' + path);
        } else if (import.meta.env.MODE === 'development') {
            let normalized = path;
            if (normalized.startsWith('/@fs')) {
                normalized = normalized.slice('/@fs'.length);
            }
            if (normalized.includes('?')) {
                normalized = normalized.split('?')[0];
            }
            return normalized;
        } else {
            throw new Error(`Unexpected MODE: ${import.meta.env.MODE}`);
        }
    }

    private async encodeImageToBase64(filePath: string) {
        const imageBuffer = await shape(filePath.split('?')[0]).png().ensureAlpha(0.2).toBuffer();
        return `data:image/png;base64,${imageBuffer.toString('base64')}`;
    }

    private fontDataRegular = readFile(
        resolve(process.cwd(), 'src/components/NotoSansJP-Regular.ttf'),
    );

    private fontDataBold = readFile(
        resolve(process.cwd(), 'src/components/NotoSansJP-Bold.ttf'),
    );

    async createOpgSvg(title: string, heroImage: string) {
        return await satori(
            {
                type: 'div',
                props: {
                    style: {
                        width: '1200px',
                        height: '630px',
                        padding: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: `url(${await this.encodeImageToBase64(heroImage)})`,
                        backgroundSize: '1200px 630px',
                        color: '#000',
                        fontFamily: 'NotoSansJP',
                    },
                    children: [
                        {
                            type: 'div',
                            props: {
                                children: [
                                    {
                                        type: 'h1',
                                        props: {
                                            children: title,
                                            style: {
                                                fontSize: '48px',
                                                fontWeight: '700',
                                                textAlign: 'center',
                                                overflowWrap: 'break-word',
                                                wordWrap: 'keep-all',
                                            },
                                        }
                                    },
                                    {
                                        type: 'p',
                                        props: {
                                            children: 'www.nagopy.com',
                                            style: {
                                                fontSize: '30px',
                                            }
                                        }
                                    }
                                ],
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    padding: '70px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    borderRadius: '25px',
                                }
                            }
                        },
                    ]
                }
            },
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'NotoSansJP',
                        style: 'normal',
                        data: await this.fontDataRegular,
                        weight: 400,
                    },
                    {
                        name: 'NotoSansJP',
                        style: 'normal',
                        data: await this.fontDataBold,
                        weight: 700,
                    }
                ],
            });
    }
}