# 📑 Tab Navigation Component

A sleek page navigation system built for form builders, featuring drag-and-drop reordering, dynamic page creation, and smooth animations. Users can create different types of pages (forms, covers, payment pages, etc.) with an intuitive interface that feels modern and responsive.

## ✨ Technologies

- `React 19`
- `TypeScript`
- `@dnd-kit` (drag & drop)
- `Zustand` (state management)
- `Tailwind CSS`
- `ShadCN` (modals & dropdowns)
- `Lucide React` (icons)

## 🚀 Features

### Core Requirements
- Display series of form pages with different types (Info, Details, Other, Ending)
- Drag and drop to reorder pages
- Add new pages between existing ones via "+" button on hover
- Context menu per page (rename, duplicate, delete, set as first page)
- Highlight active page and allow selecting other pages
- State persisted in memory (no backend needed)

### Additional Polish I Added
- [x] **Butter smooth hover/transition animations** - Everything feels fluid and responsive
- [x] **Grip icon** - Makes it super clear that tabs are draggable 
- [x] **Page name modal** - When adding pages, users can set a custom name right away
- [x] **Page type selection** - Choose from different page types (Form, Cover, Payment, etc.) before creating
- [x] **Text truncation** - Long page names get "..." so the layout stays clean

## 📍 The Process

Started this thinking it'd be straightforward, but man, there were so many little details to get right! 

First, I focused on getting the basic UI looking good, wanted those tabs to feel polished from the start. Spent way too much time tweaking the shadows and border radius, but it was worth it.

Then I tackled the "+" button functionality. Getting those inline add buttons to appear on hover between tabs was trickier than expected. Had to play around with the positioning and transitions to make it feel natural.

After that came the page type selection flow. Instead of just adding generic pages, I thought it'd be cooler to let users pick what kind of page they're creating first: forms, payment pages, cover pages, etc. Added a nice modal flow for that.

Last but definitely not least was the drag and drop. Used @dnd-kit which is pretty solid, but getting the visual feedback right during dragging took some iteration. The grip icon was a game changer for making it obvious what's draggable.

The whole thing uses Zustand for state management which keeps things simple, and everything persists to localStorage so your work doesn't disappear on refresh.

## 🚦 Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`  
4. Open `http://localhost:5173` in your browser

## 🔧 Room for Improvement

- **Add Storybook** for the sake of product designers who need to see all component variants
- **Keyboard navigation** with arrow keys to move between tabs and space to activate
- **Better mobile experience** since it's currently desktop-focused, could use touch gestures
- **Undo/redo functionality** because we all accidentally delete stuff sometimes
- **Bulk operations** to select multiple tabs and do things to them at once
- **Custom page icons** so users can upload or pick their own icons for page types
- **Export/import configs** to save tab setups and share them with others
- **Animation preferences** for people who prefer things less bouncy
- **Tab templates** with pre-built page sequences for common workflows
- **Duplicate name validation** to check if a page name already exists when adding new ones

## 🐛 Known Issues

### Plus Button Insertion Bug
**Issue**: When clicking the "+" button between two existing pages, the new page gets inserted at the end of the page flow instead of at the intended position.

**Expected Behavior**: 
- Click "+" between "Info" and "Details" → new page should appear between those two tabs
- Click "+" between "Details" and "Other" → new page should appear between those two tabs

**Current Behavior**: 
- Regardless of where you click the "+", new pages always get added at the very end after all existing pages

## 🎥 Demo

https://github.com/user-attachments/assets/00b88947-e898-48e0-8f7b-c80de191b650





**Impact**: Makes it frustrating to build forms with pages in a specific order, as users have to drag pages around after creation instead of placing them correctly from the start.
