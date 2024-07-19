import React, { lazy, Suspense } from "react";
import LoadingScreen from "../utils/LoadingScreen";

function withLazyLoad(importFunc) {
  const LazyComponent = lazy(importFunc);

  return (props) => (
  <Suspense fallback={<LoadingScreen />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default withLazyLoad;
  