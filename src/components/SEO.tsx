import { Helmet } from "react-helmet-async";

const SITE = "https://hugo-nanny.de";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const SEO = ({ title, description, path, ogImage, jsonLd }: SEOProps) => {
  const url = `${SITE}${path}`;
  const image = ogImage ? (ogImage.startsWith("http") ? ogImage : `${SITE}${ogImage}`) : undefined;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
