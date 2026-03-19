# Environment Setup Guide

## ⚠️ CRITICAL SECURITY RULES

Never commit `.env` files. They contain sensitive credentials like database passwords and API keys.

## Setup Instructions

### For Developers (First Time Setup)

1. **Copy template files:**
   ```powershell
   # Server
   Copy-Item server\.env.example server\.env
   
   # Client
   Copy-Item client\.env.example client\.env
   ```

2. **Fill in real values:**
   - `server/.env` - Add actual MongoDB URI, JWT secret
   - `client/.env` - Update API_URL for your environment

3. **Verify setup:**
   ```powershell
   git status  # Should NOT show .env files
   ```

### Environment Files Explained

| File | Status | Purpose |
|------|--------|---------|
| `.env` | ❌ Ignored (local only) | Production credentials, secrets |
| `.env.*` | ❌ Ignored (local only) | Environment-specific configs |
| `.env.example` | ✅ Tracked (GitHub) | Template for developers |

### Protected Variables

**Server (`server/.env`):**
- `MONGO_URI` - Private database credentials
- `JWT_SECRET` - Secret signing key
- `CORS_ORIGIN` - Allowed client origins

**Client (`client/.env`):**
- `VITE_API_URL` - API endpoint (safe to share)

## Security Mechanisms in Place

### 1. Git Ignore Rules
```
.env        # Ignore all .env files globally
.env.*      # Ignore environment-specific files
!.env.example  # EXCEPT: Track .env.example
```

### 2. Pre-Commit Hook
Located at: `.git/hooks/pre-commit`

Automatically prevents committing any `.env` files.

**Error if .env is attempted to be committed:**
```
❌ ERROR: Attempted to commit .env file(s)
⚠️  SECURITY RISK: .env files contain sensitive credentials
```

### 3. Git Configuration
- `core.hooksPath` - Points to .git/hooks
- `core.fileMode` - Disabled for cross-platform compatibility

## Troubleshooting

### Q: I accidentally added .env to Git!

**Solution:**
```powershell
# Remove from Git tracking (not your disk)
git rm --cached .env server/.env client/.env

# Remove from all history (DANGEROUS - requires force push)
# Only do this if not shared with team yet
git filter-branch --tree-filter 'rm -f .env' HEAD

# Commit and push
git commit -m "Remove .env from tracking"
git push origin main
```

### Q: Pre-commit hook isn't working?

**Fix:**
```powershell
# Verify hook path
git config core.hooksPath

# Make hook executable (Git Bash style)
git config core.hooksPath ./.git/hooks
```

### Q: How to update .env.example?

1. Update the `.env.example` file
2. Commit and push: `git add .env.example && git commit -m "Update .env.example template"`
3. Notify team to update their local `.env` files

### Q: Accidentally committed secrets?

**Immediate action:**
```powershell
# 1. Rotate credentials immediately (new DB password, JWT secret, API keys)
# 2. Remove from Git history using git-filter-repo or similar
# 3. Never rely on just deleting the commit - history is visible
```

## Best Practices

✅ **DO:**
- Use `.env.example` for templates
- Add all new env variables to `.env.example`
- Rotate credentials if accidentally exposed
- Use environment-specific configs: `.env.development`, `.env.production`

❌ **DON'T:**
- Commit `.env` files
- Share credentials via Git
- Use hardcoded secrets in code
- Push credentials to public repositories
- Store `.env` in version control

## For DevOps/Production

Recommended deployment practices:
- Use **environment variables** (set by hosting platform)
- Use **Docker secrets** (Kubernetes, Docker Swarm)
- Use **AWS Secrets Manager** / Azure Key Vault
- Use **GitHub Secrets** for CI/CD pipelines
- Never commit secrets to Git

---

**Last Updated:** March 19, 2026  
**Maintained By:** Chirag Bhoi  
**Status:** Production Ready ✅
