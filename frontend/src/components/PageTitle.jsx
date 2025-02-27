import e from "cors";
import React from "react";

function PageTitle({ title }) {
  return (
    <div className="page-title">
      <h1 className="text-xl uppercase">{title}</h1>
    </div>
  );
}

export default PageTitle;
