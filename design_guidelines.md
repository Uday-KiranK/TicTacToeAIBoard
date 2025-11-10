# Design Guidelines: Multiplayer Tic-Tac-Toe with Alpha-Beta Pruning Visualizer

## Design Approach

**Selected Approach:** Design System with Educational Focus
- Primary inspiration: Material Design for clean, structured interfaces
- Secondary reference: Algorithm visualization tools (VisuAlgo, CS Academy) for tree displays
- Educational-first design emphasizing clarity and learning

**Core Principle:** Information hierarchy and spatial organization for concurrent viewing of game and AI analysis

## Layout System

**Split-Screen Architecture:**
- Desktop: 50/50 split - Game Board (left) | AI Helper Panel (right)
- Tablet: Collapsible panels with toggle between views
- Mobile: Stacked layout with sticky game board, scrollable AI panel below

**Spacing Primitives:**
Use Tailwind units: 2, 4, 6, 8, 12, 16, 24 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: gap-8 to gap-12
- Tree node spacing: gap-4

## Typography

**Font Families:**
- Primary: Inter (Google Fonts) - for UI text, labels, instructions
- Monospace: JetBrains Mono (Google Fonts) - for alpha-beta values, scores, technical data

**Hierarchy:**
- Page title: text-2xl font-semibold
- Section headers: text-lg font-medium
- Game status: text-xl font-bold
- Node values: text-sm font-mono
- Helper text: text-sm

## Component Library

### Game Board Section
**Board Container:**
- 3x3 grid with equal-sized cells
- Cell size: 100px × 100px (desktop), 80px × 80px (mobile)
- Board shadow: shadow-2xl for depth
- Cells: Rounded corners (rounded-lg), border separation

**Game Controls:**
- Top bar: Room ID display with copy button, player indicators (X/O), turn status
- Bottom: "Toggle AI Helper" button (prominent, sticky)
- Share link modal: Centered overlay with generated URL and copy functionality

### AI Helper Panel
**Panel Structure:**
- Header: "Alpha-Beta Pruning Analysis" with close/minimize option
- Best move highlight: Prominent card showing optimal next move with score
- Tree viewport: Scrollable canvas for full game tree

**Tree Visualization:**
- Nodes: Rounded rectangles (rounded-md) with distinct states:
  - Current state: Thick border (border-4)
  - Evaluated: Standard border (border-2)
  - Pruned: Dashed border with reduced opacity (opacity-50)
- Node content: 3x3 mini-board, alpha-beta values, score (+1/-1/0)
- Connections: SVG lines connecting parent-child nodes
- Layout: Hierarchical top-to-bottom tree structure with horizontal spacing
- Color coding: Use border colors to indicate node type (current/max/min/pruned)

**Value Display:**
- Alpha value: "α: X" in top-left of node
- Beta value: "β: X" in top-right of node
- Score: Large centered value (+1, -1, 0)
- Node type indicator: "MAX" or "MIN" label

### Navigation & Multiplayer
**Header Bar:**
- Logo/title on left
- Room status (Waiting/Playing) in center
- Player avatars (simple X/O indicators) on right

**Waiting Room:**
- Centered card showing shareable link
- Connection status indicator
- "Copy Link" button with success toast feedback

## Animations

**Minimal, purposeful animations only:**
- Cell selection: Scale transform (scale-95 on click)
- Tree node reveal: Fade-in as analysis completes (duration-300)
- Move highlight: Subtle pulse on recommended move
- NO complex scroll animations or decorative transitions

## Interaction Patterns

**Concurrent Viewing Strategy:**
- AI panel updates in real-time as user hovers over cells
- Tree automatically scrolls to relevant branch for current game state
- Collapsible sections in AI panel: "Current Analysis" (expanded) and "Full Tree" (collapsible)

**Game Flow:**
1. Landing: Create/Join game with room code input
2. Waiting: Share link display while awaiting opponent
3. Playing: Split view with game + optional AI helper
4. Complete: Result overlay with replay option

## Accessibility
- Focus indicators on all interactive elements (ring-2)
- ARIA labels for screen readers on game cells and tree nodes
- Keyboard navigation: Arrow keys for cell selection, Tab for controls
- High contrast mode support for tree visualization

## Critical Design Constraints
- Board and AI helper MUST be visible simultaneously on desktop (no tabs/toggles that hide one)
- Tree must show ALL branches including pruned ones (with visual distinction)
- Score values must be crystal clear: +1 (win), -1 (loss), 0 (draw)
- Alpha-beta values displayed on every evaluated node

## Images
No hero images required. This is a utility-focused application. Use icon library (Heroicons) for UI controls: copy, share, info, close icons.