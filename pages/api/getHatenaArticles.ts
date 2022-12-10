import fetch from "node-fetch";
import { parseString } from "xml2js";

export const getHatenaArticles = async () => {
    const url = `https://blog.hatena.ne.jp/SazanamiN/sazanamin.hatenablog.jp/atom/entry`;

    const hatenaAPIUser = "SazanamiN";
    const hatenaAPIPassword = "kcma04vvsq";
    const creds = `${hatenaAPIUser}:${hatenaAPIPassword}`;
    const encoded = Buffer.from(creds).toString("base64");
    const authorizationHeader = `Basic ${encoded}`;

    const response = await fetch(url, {
        headers: {
            Authorization: authorizationHeader,
        },
    });

    const text = await response.text();

    const parsed = await parseStringPromise(text);

    const articles = parsed.feed.entry.map((_) => ({
        title: _.title,
        published: _.published[0],
        link: _.link[1]["$"].href,
    }));

    return articles;
};

type FetchHatenaResponse = {
    feed: {
        entry: {
            title: string;
            published: string[];
            link: {
                $: {
                    rel: string;
                    type: string;
                    href: string;
                };
            }[];
        }[];
    };
};

function parseStringPromise(data: string): Promise<FetchHatenaResponse> {
    return new Promise((resolve, reject) => {
        parseString(data, (err: any, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}
