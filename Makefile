.DEFAULT_GOAL := menu

menu:
	@echo "╔═══════════════════════════════════════════════╗"
	@echo "║       Turn Tracker — Command Menu             ║"
	@echo "╚═══════════════════════════════════════════════╝"
	@echo ""
	@echo "  === Development ==="
	@echo "  1) Start dev server"
	@echo "  2) Production build"
	@echo "  3) Preview production build"
	@echo ""
	@echo "  === Quality ==="
	@echo "  4) Run linter"
	@echo ""
	@echo "  === Setup ==="
	@echo "  5) Install dependencies"
	@echo ""
	@read -p "Enter choice: " choice; \
	case $$choice in \
		1) $(MAKE) dev ;; \
		2) $(MAKE) build ;; \
		3) $(MAKE) preview ;; \
		4) $(MAKE) lint ;; \
		5) $(MAKE) install ;; \
		*) echo "Invalid choice" ;; \
	esac

dev:
	npm run dev

build:
	npm run build

build-dev:
	npm run build:dev

preview:
	npm run preview

lint:
	npm run lint

install:
	npm install

help:
	@echo "Available commands:"
	@echo "  make dev       - Start development server"
	@echo "  make build     - Production build"
	@echo "  make build-dev - Development build"
	@echo "  make preview   - Preview production build locally"
	@echo "  make lint      - Run ESLint"
	@echo "  make install   - Install npm dependencies"

list:
	@grep -E '^[a-zA-Z_-]+:' Makefile | grep -v '.DEFAULT_GOAL' | sed 's/:.*//' | sort

.PHONY: menu dev build build-dev preview lint install help list
