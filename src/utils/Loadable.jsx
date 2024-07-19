import React, { Suspense, lazy } from "react";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (importFunc) => {
  const LazyComponent = lazy(importFunc);

  return (props) => (
    <Suspense fallback={<LoadingScreen />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default Loadable;
