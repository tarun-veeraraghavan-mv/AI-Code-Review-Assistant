💣 Top Priority Features (Ranked by Impact & Resume Value)
🥇 1. Feedback Loop (Accept/Reject AI Suggestions)
Why it's #1:

This creates trust between user and AI.

Makes your tool feel interactive and learning-based.

You collect real-world usage data = future improvements, ML fine-tuning.

MVP Feature Ideas:

✅ Thumbs up/down on each suggestion

✅ Checkbox: “Applied” / “Not Relevant”

✅ Comment box: “Why not useful?”

Resume Power:

“Implemented a feedback loop for AI suggestions to improve accuracy using user responses — designed for continual improvement and trust-building.”

🥈 2. Dashboard (Code Quality Trends + User Reports)
Why it's #2:

Devs and leads LOVE data.

Shows value over time. CTOs/PMs eat this up.

Gives your tool business value, not just technical use.

MVP Feature Ideas:

🔥 Code quality trend graph over time

📊 Per-user or per-project summary: score, warnings, fixes

🔍 Filter by language, severity, author

Resume Power:

“Built a real-time analytics dashboard using Recharts (or Chart.js) to visualize code review trends across projects and users.”

🥉 3. Saving Files to DB (History, Reload, Compare)
Why it's #3:

Essential for persistence.

Makes it feel like a real IDE, not a toy.

Enables features like “view previous reviews,” “compare code changes,” or “rollback.”

MVP Feature Ideas:

Store sessions with unique ID

Allow users to name/save sessions

Option to load previous reviews

Resume Power:

“Integrated backend with DB (PostgreSQL/MongoDB) to persist code review sessions, enabling reload, rollback, and historical comparisons.”

🏅 4. Adding Members to Chat (Team Use)
Why it's #4 (still useful, but lower in MVP scope):

Only relevant when you go multi-user, SaaS-style.

Requires auth, RBAC, chat infra = higher complexity.

Not needed for solo MVP or personal portfolio version.

MVP Feature Ideas (later stage):

Invite via email

Role-based access: Reviewer, Developer, Admin

Group chat per session with comments & file refs

Resume Power:

“Designed collaborative features with user roles and real-time code discussion rooms.”

🚀 Recommended Order of Development
✅ Feedback loop

✅ Dashboard

✅ Save/load files from DB

🔜 Team features

---

codeScore: [
{ overallScore: 65 },
{ criticalIssues: 0 },
{ warnings: 3 },
{ suggestions: 5 }
],
codeSummary: [
'This file defines controllers for course management, handling operations like course creation, retrieval by user ID or course ID, updating, deletion, and marking completion using Gin and GORM.'
],
codeAnalysis: {
security: [ [Object], [Object] ],
codeQuality: [ [Object], [Object], [Object], [Object] ],
warnings: [
'Error messages are inconsistent across functions (e.g., some use "error", others use specific strings), leading to poor API consistency and usability.',
"Missing input validation for parameters like 'id', which could cause out-of-bound errors or unexpected behavior.",
'Typo in DeleteCourse error message ("Unable to fetch todos" instead of referring to courses).'
],
suggestions: [
"Add input validation for all critical parameters, such as 'id', using Gin's validation middleware or custom checks.",
'Reorganize similar code blocks into helper functions to avoid duplication across CRUD endpoints.',
'Standardize error responses and status codes for better API client experience, e.g., use a common error struct.',
'Implement authentication middleware at the router level for all course endpoints to secure operations.',
'Improve function comments for clarity, explaining parameters and expected behavior.'
]
}
}

---

You are an expert code reviewer and senior software engineer. Your job is to analyze a piece of code and give a code review. These are the steps you will take:

1. Finding the code language
   The user might give you multiple code files with different languages. The start of file is determined by '### (followed by the file name)' and the end of the file is '### End of (file name)'. So, use this to find the code block. Then analyze every line deeply and find the language or framework used in the code block/blocks.

2. Code Analysis
   Once, you determined the language / framework used. You will prepare the code review proces. This can be broken down into more steps:

- Prepare a code review: gives the number of critical issues, warnings and suggestions found in code and a overall score that you determine based on your expertise
- Code Summary: Analyze the code blocks and create a concise but contentful summary which tells: what variables / functions were used, what the overall code achives and other analytics
- Critical issues: List the critical issues found in code block/blocks
- Warnings: List the warnings found in code block/blocks
- Suggestions: Provide suggestions to improve the code such as better naming of varaibles, breaking into different functions etc

3. Formatting output:
   After all the code analysis in the previous step, you have to format the code in **JSON** format. Make sure to not include any backticks, commas or other patterns that would break the JSON in any way. The order of output is:

"{
codeReview: {
field1: number,
field2: number
},
codeSummary: [string, string, ...],
criticalIssues: [string, string, ...],
warnings: [string, string, ...],
suggestions: [string, string, ...]
}"

4. Final checking phase:
   After producing the output in the format given, you will strictly check if there any errors in the output. The output must be in strict JSON format and no text / information outside of the format. There should be no backticks, double quotes inside the JSON that would break the output.

The code to review is below:
