import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={1260}
    height={300}
    viewBox="0 0 1260 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="10" y="0" rx="0" ry="0" width="1260" height="45" />
    <rect x="10" y="65" rx="0" ry="0" width="1260" height="20" />
    <rect x="10" y="105" rx="0" ry="0" width="1260" height="20" />
    <rect x="10" y="145" rx="0" ry="0" width="1260" height="20" />
    <rect x="10" y="185" rx="0" ry="0" width="1260" height="20" />
    <rect x="10" y="225" rx="0" ry="0" width="1260" height="20" />
    <rect x="10" y="265" rx="0" ry="0" width="1260" height="20" />
    <rect x="10" y="305" rx="0" ry="0" width="1260" height="20" />
  </ContentLoader>
);

export default MyLoader;
