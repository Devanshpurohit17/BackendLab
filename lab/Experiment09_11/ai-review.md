# Task 6: AI-assisted review

The review was done with an AI tool.

| Suggestion | Decision | Reason |
|---|---|---|
| Use `textContent` for student data | Accepted | Stops data from being run as HTML |
| Check `response.ok` after `fetch` | Accepted | `fetch` does not reject on 404 or 500 |
| Serve only listed files from Express | Accepted | Serving the whole folder would expose source files |
| Replace jQuery with plain JavaScript | Rejected | Experiment 10 requires jQuery |
