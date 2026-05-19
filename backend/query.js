

export const createConvo = ```
INSERT INTO conversations
(user_id, title)
VALUES
($1, $2);
```
