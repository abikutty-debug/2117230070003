# Stage 1 - Campus Notifications System Design

## Objective
To build a campus notification system that prioritizes important notifications based on category and recency.

## Priority Logic
Priority is determined using weighted scoring:

- Placement = Highest Priority
- Result = Medium Priority
- Event = Lower Priority

## Recency Factor
Recent notifications are given additional score to ensure latest important updates appear first.

## Efficient Top 10 Maintenance
To efficiently maintain top notifications when new notifications arrive continuously:

- Use Min Heap / Priority Queue
- Insertion Complexity: O(log n)
- Retrieval Complexity: O(1) for top item
- Ensures scalability for real-time systems

## Frontend Implementation
- React + Vite
- Material UI Dashboard
- Search + Filters
- Protected API Authentication
- Logging Middleware
- Dynamic Priority Inbox

## Logging Middleware
Reusable log function:
Log(stack, level, package, message)

Used across:
- API fetch
- Component load
- Error tracking