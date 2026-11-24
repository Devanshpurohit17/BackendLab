# Conceptual model: E-Commerce System

```mermaid
erDiagram
    CUSTOMER ||--o| CART : owns
    CUSTOMER ||--o{ ORDER : places
    CART }o--o{ PRODUCT : contains
    ORDER }o--|{ PRODUCT : includes
```
