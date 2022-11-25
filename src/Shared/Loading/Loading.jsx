import React from "react";
import { Watch } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#dca54b"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
