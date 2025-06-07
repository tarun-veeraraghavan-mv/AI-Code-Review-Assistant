import React from "react";
import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import CodeReport from "../../src/components/CodeReport";
import ScoreCard from "../../src/components/ScoreCard";

describe("CodeReport", () => {
  const review = {
    _id: "1o8712837128311283128",
    codeReview: {
      overallScore: 85,
      criticalIssues: 0,
      warnings: 2,
      suggestions: 3,
    },
    codeSummary: [
      "This is a code block that tests the App.jsx React Component",
    ],
    criticalIssues: [".env variable not secured"],
    warnings: [],
    suggestions: ["Use functional components than class-based components"],
  };

  it("should render the ScoreCard properly", () => {
    render(
      <ScoreCard
        score={{
          codeScore: {
            overallScore: review.codeReview.overallScore,
            criticalIssues: review.codeReview.criticalIssues,
            warnings: review.codeReview.warnings,
            suggestions: review.codeReview.suggestions,
          },
        }}
      />
    );

    expect(screen.getByText(/critical issues:/i)).toBeInTheDocument();
    expect(screen.getByText(/0/)).toBeInTheDocument();

    expect(screen.getByText(/warnings:/i)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();

    expect(screen.getByText(/suggestions:/i)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();

    // Check circular score
    expect(screen.getByText("85")).toBeInTheDocument();
  });

  it("should render the CodeReport properly", () => {
    render(<CodeReport review={review} />);

    const pageHeading = screen.getByRole("heading", {
      name: /code summary/i,
    });
    const codeSummary = screen.getByText(/App.jsx React Component/i);
    const criticalIssues = screen.getByText(/.env/i);
    const warnings = screen.queryByText(/this warning should not be rendered/i);
    const suggestions = screen.getByText(
      /functional components than class-based/i
    );

    expect(pageHeading).toBeInTheDocument();
    expect(codeSummary).toBeInTheDocument();
    expect(criticalIssues).toBeInTheDocument();
    expect(warnings).not.toBeInTheDocument();
    expect(suggestions).toBeInTheDocument();
  });
});
