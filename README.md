# 🐱 Spy Cat Agency Frontend

A modern React/Next.js frontend for the Spy Cat Agency management system, built with TypeScript, Tailwind CSS, and shadcn/ui components.

> **Backend API**: The corresponding backend API for this project is available at [https://github.com/DanielMendesSensei/Spycat-BE](https://github.com/DanielMendesSensei/Spycat-BE)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fe-spycat.git
cd fe-spycat

# Install dependencies
npm install

# Setup environment
make setup

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Alternative Commands (using Makefile)

```bash
# Setup project with environment
make setup

# Start development
make dev

# Build for production
make build

# Start production server
make start

# Run tests
make test

# Lint and format code
make lint
make format

# Check all (pre-commit)
make pre-commit
```

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Development**: ESLint, Prettier, Jest

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Dashboard homepage
│   ├── globals.css         # Global styles and Tailwind
│   └── favicon.ico         # Application favicon
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   │   ├── badge.tsx      # Status indicators
│   │   ├── button.tsx     # Interactive buttons
│   │   ├── card.tsx       # Content containers
│   │   ├── dialog.tsx     # Modal dialogs
│   │   ├── form.tsx       # Form components
│   │   ├── input.tsx      # Input fields
│   │   ├── label.tsx      # Form labels
│   │   ├── spinner.tsx    # Loading indicators
│   │   └── table.tsx      # Data tables
│   ├── spy-cats/          # Spy cat management
│   │   ├── SpyCatList.tsx    # List all spy cats
│   │   ├── SpyCatForm.tsx    # Create/edit spy cats
│   │   ├── SpyCatDetail.tsx  # Detailed spy cat view
│   │   └── index.ts          # Component exports
│   ├── missions/          # Mission management
│   │   ├── MissionList.tsx   # List all missions
│   │   └── index.ts          # Component exports
│   ├── targets/           # Target management
│   │   ├── TargetList.tsx    # List mission targets
│   │   └── index.ts          # Component exports
│   ├── sections/          # Page sections
│   │   └── SpyCatSection.tsx # Main spy cat section
│   ├── forms/             # Legacy form components
│   │   ├── EditSalaryForm.tsx
│   │   ├── SpyCatCard.tsx
│   │   └── SpyCatForm.tsx
│   ├── Footer.tsx         # Application footer
│   └── Sidebar.tsx        # Navigation sidebar
├── hooks/                  # React Query custom hooks
│   ├── useSpyCats.ts      # Spy cat data management
│   ├── useMissions.ts     # Mission data management
│   ├── useTargets.ts      # Target data management
│   └── useBreeds.ts       # Cat breeds data
├── lib/                    # Utility libraries
│   ├── utils.ts           # General utilities (cn, etc.)
│   └── validations.ts     # Zod validation schemas
├── services/               # API services
│   └── api/
│       └── index.ts       # Centralized API client
├── types/                  # TypeScript definitions
│   └── index.ts           # All type definitions
├── constants/              # Application constants
└── utils/                  # Additional utilities
```

## 🎯 Features

### ✅ Core Features

#### 🐱 Spy Cat Management
- **CRUD Operations**: Create, read, update, and delete spy cats
- **Profile Management**: Name, experience, breed, salary tracking
- **Statistics**: Success rates, mission counts, availability status
- **Search & Filter**: Find spy cats by various criteria
- **Salary Updates**: Edit spy cat salaries (only editable field)

#### 🎯 Mission Management
- **Mission Creation**: Assign missions to available spy cats
- **Progress Tracking**: Monitor mission completion status
- **Target Management**: Track individual targets within missions
- **Mission Assignment**: Assign/reassign missions to different cats
- **Completion Workflow**: Mark missions as complete

#### 🎯 Target Management
- **Target CRUD**: Create and manage mission targets
- **Notes System**: Add detailed notes for each target
- **Elimination Tracking**: Track target elimination status
- **Mission Association**: Targets are linked to specific missions

#### 📊 Dashboard & Analytics
- **Real-time Statistics**: Live data updates
- **Mission Progress**: Visual progress indicators
- **Cat Performance**: Success rates and experience tracking
- **Available Cats**: Quick view of ready operatives

### 🎨 UI/UX Features

- **Responsive Design**: Mobile-first, works on all devices
- **Modern Interface**: Clean, professional design
- **Dark/Light Theme**: (Ready for implementation)
- **Smooth Animations**: Framer Motion integration
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Spinners and skeletons for better UX
- **Form Validation**: Real-time validation with Zod
- **Accessibility**: ARIA labels and keyboard navigation

### 🔧 Technical Features

- **Type Safety**: Full TypeScript coverage
- **Performance**: React Query caching and optimization
- **Error Handling**: Comprehensive error boundaries
- **Code Quality**: ESLint, Prettier, and pre-commit hooks
- **Testing**: Jest setup for unit testing
- **Bundle Analysis**: Webpack bundle analyzer
- **Modern Development**: Hot reloading with Turbopack

## 🔗 API Integration

Complete integration with the [Spy Cat Agency Backend](https://github.com/DanielMendesSensei/Spycat-BE):

### Endpoints Used

#### Spy Cats API
- `GET /api/cats/` - List all spy cats with filters
- `GET /api/cats/{id}` - Get spy cat details
- `POST /api/cats/` - Create new spy cat
- `PUT /api/cats/{id}` - Update spy cat (salary only)
- `DELETE /api/cats/{id}` - Delete spy cat
- `GET /api/cats/available/` - Get available cats
- `GET /api/cats/stats/` - Get cat statistics
- `GET /api/cats/search/` - Search cats

#### Missions API
- `GET /api/missions/` - List all missions
- `GET /api/missions/{id}` - Get mission details
- `POST /api/missions/` - Create new mission
- `DELETE /api/missions/{id}` - Delete mission
- `PATCH /api/missions/{id}/complete/` - Mark as complete

#### Targets API
- `GET /api/targets/` - List targets
- `GET /api/targets/{id}` - Get target details
- `POST /api/targets/` - Create target
- `PUT /api/targets/{id}` - Update target
- `DELETE /api/targets/{id}` - Delete target


## 🚀 Development

### Environment Setup

1. Copy environment file:
```bash
cp .env.example .env
```

2. Configure your API endpoint in `.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Development Workflow

```bash
# Install dependencies
make install

# Start development server
make dev

# Run linting
make lint

# Run tests
make test

# Format code
make format

# Type checking
make type-check

# Pre-commit checks (lint + format + test + type-check)
make pre-commit
```

### Code Organization

- **Components**: Organized by feature (spy-cats, missions, targets)
- **Hooks**: Custom React Query hooks for data management
- **Types**: Centralized TypeScript definitions
- **Services**: API client and service layer
- **Validation**: Zod schemas for form validation
- **Utilities**: Helper functions and utilities

### Best Practices

- **Component Composition**: Reusable, composable components
- **Type Safety**: Full TypeScript coverage with strict mode
- **Performance**: Optimized with React Query caching
- **Error Boundaries**: Proper error handling throughout
- **Accessibility**: ARIA labels and keyboard navigation
- **Testing**: Unit tests for critical components
- **Code Quality**: ESLint and Prettier configurations

### Architecture Decisions

- **App Router**: Using Next.js 15 App Router for file-based routing
- **React Query**: For server state management and caching
- **shadcn/ui**: For consistent, accessible UI components
- **Zod**: For runtime type validation and form schemas
- **Tailwind CSS**: For utility-first styling approach

## 📱 Deployment

### Production Build

```bash
# Build for production
make build

# Start production server
make start
```

### Deployment Options

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative deployment platform
- **Docker**: Containerized deployment (if needed)
- **Static Export**: Can be configured for static hosting

## 🧪 Testing

```bash
# Run all tests
make test

# Run tests in watch mode
make test-watch

# Run tests with coverage
make test-coverage
```

## 📦 Build Analysis

```bash
# Analyze bundle size
make analyze
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Daniel Mendes**

- GitHub: [@DanielMendesSensei](https://github.com/DanielMendesSensei)
- Backend Repository: [Spycat-BE](https://github.com/DanielMendesSensei/Spycat-BE)

---

*Built using Next.js, TypeScript, and modern web technologies.*
