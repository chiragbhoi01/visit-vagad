# Git + .env Security - PowerShell Command Reference

## Quick Start: First Time Setup

```powershell
# Navigate to project
cd c:\path\to\visit-vagad

# Copy template files
Copy-Item server\.env.example server\.env
Copy-Item client\.env.example client\.env

# Edit files with your credentials
code server\.env
code client\.env

# Verify setup (should NOT show .env in git status)
git status
```

## Common Scenarios

### ✅ Checking for .env leaks

```powershell
# Are any .env files tracked by Git?
git ls-files | findstr "\.env"
# ✓ GOOD: Only shows *.env.example files

# Are .env files in working directory?
Get-ChildItem -Path . -Filter ".env*" -Recurse -Hidden
```

### ✅ Updating .env.example (safe to commit)

```powershell
# Edit the template
code server\.env.example

# Add to Git
git add server\.env.example
git commit -m "docs: update server .env template"
git push origin main
```

### ❌ If you accidentally try to commit .env

```powershell
# PRE-COMMIT HOOK will block this:
git add .env
git commit -m "Add config"  # ❌ ERROR: Pre-commit hook blocks it

# FIX: Remove from staging
git reset HEAD .env
# OR
git restore --staged .env
```

### ⚠️ If .env is already in Git history (NUCLEAR OPTION)

Only do this if .env was never pushed to public repo!

```powershell
# Option 1: Remove from all history (requires force push)
git filter-branch --tree-filter 'Remove-Item .env -ErrorAction SilentlyContinue' -- --all

# Option 2: Use git-filter-repo (more powerful)
# First install:
pip install git-filter-repo
# Then:
git filter-repo --invert-paths --path server\.env --path client\.env

# After cleanup, force push
git push origin main --force-with-lease
```

### ✅ Verifying your current setup

```powershell
# Check .gitignore rules
cat .\.gitignore | findstr "env"
# Should show:
#   .env
#   .env.*
#   !.env.example

# Check pre-commit hook exists
Test-Path .\.git\hooks\pre-commit
# Should return True

# Check hook configuration
git config core.hooksPath
# Should return: ./.git/hooks
```

### ✅ Team onboarding

```powershell
# New developer setup command
git clone https://github.com/chiragbhoi01/visit-vagad
cd visit-vagad
Copy-Item server\.env.example server\.env
Copy-Item client\.env.example client\.env
# Now edit .env files with their values
```

## Understanding Git States

### Tracked vs Untracked vs Staged

```powershell
# Show everything
git status

# Files in staging (ready to commit)
git diff --cached

# Files modified but not staged
git diff

# Files tracked by Git
git ls-files

# Files ignored by .gitignore
git check-ignore -v .env
# Output: ./.gitignore:59:.env  .env
```

## Pre-Commit Hook Details

Location: `.git/hooks/pre-commit`

**What it does:**
1. Checks every commit
2. Looks for files matching: `.env`, `.env.*` (except `.env.example`)
3. If found, BLOCKS the commit with error message
4. Shows instructions to fix

**Test the hook:**

```powershell
# Try to commit a .env file (will fail)
git add server\.env
git commit -m "test"
# ❌ ERROR: Attempted to commit .env file(s)

# Remove from staging
git reset HEAD server\.env

# Try again (should work)
git commit -m "test"  # ✅ SUCCESS
```

## Emergency: Rotating Credentials

If credentials were exposed in Git:

```powershell
# 1. Rotate immediately (new MongoDB password, JWT secret, API keys)

# 2. Remove from Git history
# ... use git-filter-repo commands above ...

# 3. Update local .env with new credentials
code server\.env

# 4. Verify no exposure
git log --all --source --remotes -- server\.env
# Should show nothing

# 5. Force push
git push origin main --force-with-lease
```

## Useful Git Aliases

Add these to PowerShell `$PROFILE`:

```powershell
function git-env-check {
    Write-Host "Checking for .env files in Git..." -ForegroundColor Cyan
    git ls-files | findstr "\\.env" -v "\\.env.example"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "⚠️  Found .env files in Git tracking!" -ForegroundColor Red
    } else {
        Write-Host "✅ No untracked .env files in Git" -ForegroundColor Green
    }
}

function git-security-status {
    Write-Host "=== Git Security Status ===" -ForegroundColor Cyan
    Write-Host "Pre-commit hook:" -ForegroundColor Cyan
    Test-Path .\.git\hooks\pre-commit | ForEach-Object { if ($_) { "✅ Enabled" } else { "❌ Missing" } }
    Write-Host "Gitignore .env rules:" -ForegroundColor Cyan
    cat .\.gitignore | findstr "env"
    Write-Host ".env.example files:" -ForegroundColor Cyan
    git ls-files | findstr "\\.env.example"
}
```

Then use:
```powershell
git-env-check
git-security-status
```

## Troubleshooting

### Q: Pre-commit hook not working?

```powershell
# Verify it exists and is executable
Test-Path .\.git\hooks\pre-commit

# Check Git hooks configuration
git config core.hooksPath   # Should show: ./.git/hooks

# Manually enable hooks
git config core.hooksPath ./.git/hooks

# Test hook directly
. .\.git\hooks\pre-commit
```

### Q: Need to bypass hook (very rare)

```powershell
# NOT RECOMMENDED, but if absolutely needed:
git commit --no-verify -m "message"

# Then immediately remove .env from staging:
git reset HEAD .env
```

### Q: Forgot to create .env.example?

```powershell
# Copy from your .env
Copy-Item server\.env server\.env.example

# Edit out sensitive data manually
code server\.env.example

# Commit
git add server\.env.example
git commit -m "docs: add server .env.example"
```

---

**Status:** ✅ Production Ready  
**Last Updated:** March 19, 2026  
**Hook Status:** Active and Enforced  
**Credential Status:** Fully Protected
