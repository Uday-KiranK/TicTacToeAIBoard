# Multiplayer Tic-Tac-Toe with Alpha-Beta Pruning Visualizer

## Overview

This is an educational multiplayer tic-tac-toe game that visualizes the alpha-beta pruning algorithm in real-time. Players can create or join game rooms to play against each other while observing how the AI evaluates possible moves using alpha-beta pruning. The application combines game theory education with an interactive gaming experience, showing the complete game tree and optimal move calculations as players make their moves.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript and Vite for fast development and build times.

**UI Component Library**: Shadcn/ui (New York style) built on Radix UI primitives, providing accessible and customizable components. The design follows Material Design principles with an educational focus, emphasizing information hierarchy for concurrent viewing of game state and AI analysis.

**Styling**: Tailwind CSS with custom design tokens for consistent spacing, typography, and color schemes. The application uses a split-screen layout on desktop (game board on left, AI helper panel on right) that adapts to stacked layouts on mobile devices.

**State Management**: 
- React hooks for local component state
- TanStack Query (React Query) for server state management and caching
- Custom WebSocket hook (`useWebSocket`) for real-time game synchronization
- Custom hook (`useAlphaBeta`) for computing and visualizing the alpha-beta pruning algorithm

**Routing**: Wouter for lightweight client-side routing.

**Key Design Decisions**:
- Educational-first approach prioritizing clarity over complexity in the AI visualization
- Real-time multiplayer using WebSockets for instant game updates
- Alpha-beta pruning computation happens client-side to visualize the entire decision tree
- Performance optimization: AI analysis only runs when 1-7 cells are empty (skips initial board and early game to prevent lag)
- Graceful degradation: Shows contextual messages ("Analysis starts after 2 moves") when AI analysis is unavailable
- Responsive design with mobile-first considerations (collapsible panels, adaptive layouts)

### Backend Architecture

**Runtime**: Node.js with Express framework for handling HTTP requests and WebSocket connections.

**WebSocket Server**: Using the `ws` library for real-time bidirectional communication between clients and server for game state synchronization.

**Game State Management**: In-memory storage using a custom `MemStorage` class that maintains:
- Active game rooms with unique IDs
- Player assignments (X/O) per room
- Current board state and turn tracking
- Game status (waiting, playing, finished)

**API Design**: WebSocket-based message protocol with discriminated union types for type-safe communication:
- `create`: Initialize a new game room
- `join`: Join an existing room by ID
- `move`: Submit a move to the current game

**Key Design Decisions**:
- In-memory storage chosen for simplicity (games are ephemeral, no persistence needed)
- WebSocket-first architecture for real-time multiplayer without polling
- Room-based game organization with short, shareable room codes
- Server acts as authoritative game state manager while clients handle AI visualization

### Data Storage Solutions

**Current Implementation**: In-memory storage via `MemStorage` class with no database persistence.

**Database Configuration**: Drizzle ORM configured with PostgreSQL support (via `@neondatabase/serverless`) but not actively used in the current game logic. The setup exists for potential future features like:
- Game history and replay functionality
- User accounts and statistics
- Leaderboards or matchmaking

**Rationale**: For the core educational tic-tac-toe experience, persistence is unnecessary since games are short-lived and the focus is on learning the algorithm rather than tracking long-term progress.

### Authentication and Authorization

**Current State**: No authentication system implemented. Players are identified by temporary client IDs generated during WebSocket connection.

**Session Management**: Simple session-based identification where the first player to join a room becomes X, and the second becomes O.

**Security Considerations**: Room IDs are randomly generated 6-character hex strings, providing basic obscurity but not designed for high-security scenarios.

## External Dependencies

### Third-Party UI Libraries

- **Radix UI**: Comprehensive collection of unstyled, accessible UI primitives (dialogs, tooltips, dropdowns, etc.)
- **Shadcn/ui**: Pre-built component patterns combining Radix UI with Tailwind CSS
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe variant styling for components
- **tailwind-merge & clsx**: Utility functions for conditional CSS class composition

### Build Tools and Development

- **Vite**: Fast build tool and dev server with HMR (Hot Module Replacement)
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Used for production server bundling
- **PostCSS & Autoprefixer**: CSS processing pipeline

### State Management and Data Fetching

- **TanStack Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form state management (configured but may not be actively used)
- **Zod**: Runtime schema validation for WebSocket messages and API contracts
- **Drizzle Zod**: Integration between Drizzle ORM and Zod schemas

### Real-Time Communication

- **ws (WebSocket)**: Server-side WebSocket implementation
- **WebSocket API (native)**: Client-side WebSocket for real-time game updates

### Database and ORM

- **Drizzle ORM**: Type-safe SQL query builder configured for PostgreSQL
- **@neondatabase/serverless**: Neon-compatible PostgreSQL driver for serverless environments
- **Drizzle Kit**: CLI tool for database migrations and schema management

### Fonts and Typography

- **Google Fonts**: 
  - Inter (primary UI font, weights 400-700)
  - JetBrains Mono (monospace for technical data like alpha-beta values, weights 400-600)

### Replit-Specific Integrations

- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tool for Replit environment
- **@replit/vite-plugin-dev-banner**: Development banner for Replit IDE