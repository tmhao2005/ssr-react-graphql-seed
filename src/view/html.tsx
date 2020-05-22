import React from "react";

interface Style {
  id: string;
  cssText: string;
}

interface HTMLProps {
  title: string;
  description: string;
  styles: Style[];
  styleLinks: string[];
  scripts: string[];
  dnsPrefetchUrls: string[];
  state?: any;
  children: string;
  config?: any;
  canonicalUrl?: string;
  schemas?: any[];
  imageUrl?: string;
  noIndex?: boolean;
  emotion?: string;
}

const Html = (props: HTMLProps) => {
  const {
    title,
    description,
    canonicalUrl,
    imageUrl,
    schemas,
    styles,
    scripts,
    dnsPrefetchUrls,
    children,
    noIndex,
    state,
  } = props;

  const styleTags = styles.map(style => <style key={style.id} id={style.id} dangerouslySetInnerHTML={{ __html: style.cssText }} />);
  const scriptTags = scripts.map(script => <script key={script} src={script} />);
  const dnsPrefetch = dnsPrefetchUrls.map(api => <link key={api} rel="dns-prefetch" href={api} />);

  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0d3880" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        {noIndex && <meta name="robots" content="noindex" />}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {styleTags}
        {dnsPrefetch}
      </head>
      <body>
        {schemas &&
          schemas.map(
            schema => schema && <script type="application/ld+json" key={schema["@type"]} dangerouslySetInnerHTML={{ __html: schema }} />
          )}
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        {state && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, "\\u003c")};`,
            }}
          />
        )}
        {scriptTags}
      </body>
    </html>
  );
};

Html.defaultProps = {
  styles: [],
  styleLinks: [],
  scripts: [],
  dnsPrefetchUrls: [],
  state: null,
  config: {},
  canonicalUrl: "",
  schemas: [],
  imageUrl: undefined,
  noIndex: false,
};

export {
  Html
};
