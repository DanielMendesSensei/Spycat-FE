.PHONY: help setup dev build start test test-watch test-coverage lint lint-fix format type-check clean install update analyze pre-commit env-example

# Colors for output
RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
BLUE=\033[0;34m
NC=\033[0m # No Color

help: ## Show help
	@echo "$(BLUE)Spy Cat Agency Frontend - Available Commands$(NC)"
	@echo "================================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-20s$(NC) %s\n", $1, $2}'

setup: ## Initial project setup
	@echo "$(YELLOW)Setting up project...$(NC)"
	@cp .env.local.example .env.local || echo ".env.local already exists"
	@npm install
	@echo "$(GREEN)Setup completed!$(NC)"

dev: ## Run in development mode
	@echo "$(YELLOW)Starting application in development mode...$(NC)"
	@npm run dev

build: ## Build for production
	@echo "$(YELLOW)Building for production...$(NC)"
	@npm run build

start: ## Start application in production
	@echo "$(YELLOW)Starting application in production...$(NC)"
	@npm start

test: ## Run tests
	@echo "$(YELLOW)Running tests...$(NC)"
	@npm run test

test-watch: ## Run tests in watch mode
	@echo "$(YELLOW)Running tests in watch mode...$(NC)"
	@npm run test:watch

test-coverage: ## Run tests with coverage
	@echo "$(YELLOW)Running tests with coverage...$(NC)"
	@npm run test:coverage

lint: ## Run linter
	@echo "$(YELLOW)Running linter...$(NC)"
	@npm run lint

lint-fix: ## Run linter and fix problems
	@echo "$(YELLOW)Running linter and fixing problems...$(NC)"
	@npm run lint:fix

format: ## Format code
	@echo "$(YELLOW)Formatting code...$(NC)"
	@npm run format

type-check: ## Check TypeScript types
	@echo "$(YELLOW)Checking TypeScript types...$(NC)"
	@npm run type-check

clean: ## Clean build files
	@echo "$(RED)Cleaning build files...$(NC)"
	@rm -rf .next
	@rm -rf dist
	@rm -rf node_modules/.cache

install: ## Install dependencies
	@echo "$(YELLOW)Installing dependencies...$(NC)"
	@npm install

update: ## Update dependencies
	@echo "$(YELLOW)Updating dependencies...$(NC)"
	@npm update

analyze: ## Analyze bundle
	@echo "$(YELLOW)Analyzing bundle...$(NC)"
	@npm run analyze

pre-commit: ## Run pre-commit checks
	@echo "$(YELLOW)Running pre-commit checks...$(NC)"
	@make format
	@make lint
	@make type-check
	@make test
	@echo "$(GREEN)Pre-commit checks completed!$(NC)"

env-example: ## Create example .env.local file
	@cp .env.local.example .env.local
	@echo "$(GREEN).env.local file created$(NC)"