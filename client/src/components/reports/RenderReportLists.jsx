import React from "react";

export default function RenderReportLists({ data, setCurrentReport }) {
  return (
    <ul>
      {data?.map((d) => (
        <li
          key={d._id}
          style={{ cursor: "pointer" }}
          onClick={() => setCurrentReport(d)}
          data-testid="reportId"
        >
          {d._id}
        </li>
      ))}
    </ul>
  );
}
