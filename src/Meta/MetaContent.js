import { Helmet } from "react-helmet";
import metaData from "../metadata";
const MetaContent = ({ page }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{metaData[page].title}</title>
      <meta name="description" content={metaData[page].description} />

      <meta property="og:title" content={metaData[page].title} />
      <meta property="og:description" content={metaData[page].description} />
      <meta property="og:type" content={metaData[page].type} />
      <meta property="og:url" content={metaData[page].URL} />
      <meta property="og:image" content={metaData[page].logo} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={metaData[page].URL} />
      <meta property="twitter:url" content={metaData[page].URL} />
      <meta name="twitter:title" content={metaData[page].title} />
      <meta name="twitter:description" content={metaData[page].description} />
      <meta name="twitter:image" content={metaData[page].logo} />
    </Helmet>
  );
};

export default MetaContent;
