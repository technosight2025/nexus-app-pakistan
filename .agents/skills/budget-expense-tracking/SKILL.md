---
name: budget-expense-tracking
description: >-
  Guidelines and architectural constraints for developing and maintaining the
  Budget & Expense Tracking features in the Nexus app.
---

# Budget & Expense Tracking

## Overview
This skill provides the authoritative rules for managing the Budget & Expense Tracking feature. The primary goal is to track real-time spending against a projected budget for an event.

## Workflow Rules

### 1. Real-time Calculation
- **Formula**: The system must accurately maintain and display `Total Budget - Actual Spent = Remaining Balance` in real-time.
- **Implementation**: Ensure that calculations are reactive and handle edge cases (e.g., zero budget, overspending negative balances).

### 2. Automated Alerts
- **Threshold**: The system must automatically notify the host if any expense entry exceeds the estimated category cost by >15%.
- **Action**: Implement these checks either on the backend upon insertion of a new expense, or via reactive frontend notifications if handled client-side.

### 3. Data Integrity
- **Category Linking**: All expense entries MUST be strictly linked to a specific vendor category (e.g., Venue, Catering, Photography). Do not allow "uncategorized" or floating expenses.

### 4. Pro-Tip Nudge (Budget Review)
- **Extreme Overspending**: If current total spending > 200% of the initial budget, the UI should explicitly suggest a "Budget Review" nudge to the user. This helps keep the user aware of significant financial deviations.

## Common Mistakes
- Allowing expenses to be saved without a linked vendor category.
- Failing to trigger the >15% category overage alert in real-time.
- Not displaying the "Budget Review" nudge when spending exceeds 200%.
