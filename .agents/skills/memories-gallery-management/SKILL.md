---
name: memories-gallery-management
description: >-
  Manages the Memories Gallery feature, ensuring correct architectural, privacy,
  and security rules are followed when modifying or extending it.
---

# Memories Gallery Management

## Overview
This skill provides the authoritative rules for managing the Memories Gallery feature in the Nexus app. The gallery allows guests to upload photos while ensuring hosts retain moderation control.

## Workflow Rules

### 1. Privacy First
- **Default Status**: All new memory uploads MUST default to `status: 'pending'` in the database.
- **Enforcement**: This must be enforced on the backend (e.g., in the POST API route), not just on the client side.

### 2. Authorization
- **Moderation Access**: Only users with the `'host'` or `'owner'` role can access the moderation endpoints (e.g., `GET /api/memories/pending`) or trigger status updates (e.g., `PATCH /api/memories/:id/approve`).
- **Public Access**: Only memories with `status: 'approved'` should be returned by public endpoints.

### 3. UI Requirements
- **Guest Interface**: The upload interface must be simple and mobile-friendly (one-click upload flow).
- **Host Interface**: The moderation dashboard should utilize a Masonry grid layout with clear 'Approve' and 'Reject' overlay actions.

### 4. Security & Performance
- **File Limits**: Ensure upload file size limits (e.g., max 5MB) are strictly enforced both on the client and server to prevent server storage overload and abuse.

## Common Mistakes
- Relying on the frontend to set the default `pending` status.
- Forgetting to check user roles on the `PATCH` moderation endpoint.
- Rendering unoptimized/large images in the Masonry grid without a CDN or Next.js Image component.
