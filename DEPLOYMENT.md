# Coolify Deployment Guide

This guide explains how to deploy the UG TOP-UP application to production using Coolify with Docker.

## 📋 Prerequisites

- Coolify instance running and accessible
- Git repository connected to Coolify
- Supabase project credentials (URL and publishable key)

## 🚀 Deployment Steps

### 1. Connect Your Repository to Coolify

1. Log into your Coolify dashboard
2. Create a new project or select an existing one
3. Add a new resource → **Public Repository** or **Private Repository**
4. Enter your Git repository URL
5. Select the branch to deploy (e.g., `main` or `master`)

### 2. Configure Build Settings

Coolify will automatically detect the `Dockerfile` in your repository. No additional build configuration is needed.

**Build Pack:** Docker

### 3. Set Environment Variables

In Coolify, navigate to your application's **Environment Variables** section and add:

```bash
# Required: Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key-here
VITE_SUPABASE_PROJECT_ID=your-project-id
```

⚠️ **Important Notes:**
- These are **build-time** environment variables (Vite bakes them into the build)
- Use your **publishable/anon key**, NOT your service role key
- Never commit these values to Git
- For self-hosted Supabase, use your custom domain URL

### 4. Configure Port Mapping

- **Container Port:** `80` (nginx serves on port 80)
- **External Port:** Set by Coolify (usually 80 or 443)
- Coolify will automatically map the external port to the container port

### 5. Deploy

1. Click **Deploy** in Coolify
2. Coolify will:
   - Clone your repository
   - Build the Docker image (multi-stage build)
   - Create and start the container
   - Map the ports
3. Monitor the deployment logs for any errors

### 6. Verify Deployment

Once deployed, visit your application URL. You should see:
- ✅ Homepage loads correctly
- ✅ All images and assets load
- ✅ Navigation works (client-side routing)
- ✅ Supabase connection works (check authentication)

## 🏗️ Architecture Overview

### Multi-Stage Docker Build

```
┌─────────────────────────────────┐
│  Stage 1: Builder (Node 20)     │
│  - Install dependencies         │
│  - Build Vite app               │
│  - Output: /app/dist            │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│  Stage 2: Production (nginx)    │
│  - Copy built files             │
│  - Serve static files           │
│  - Handle SPA routing           │
│  - Final size: ~50MB            │
└─────────────────────────────────┘
```

### Benefits

- **Small Image Size:** ~50MB (vs ~1GB with Node.js)
- **Fast Builds:** Layer caching optimizes rebuild time
- **Security:** Alpine Linux base, minimal attack surface
- **Performance:** nginx with gzip, caching headers
- **SPA Support:** Proper client-side routing handling

## 🔧 Configuration Files

### Dockerfile
Multi-stage build that:
1. Builds the app with Node.js
2. Serves with nginx in production

### nginx.conf
Production-optimized nginx configuration:
- SPA routing (fallback to index.html)
- Gzip compression
- Security headers
- Static asset caching
- Health checks

### .dockerignore
Optimizes build by excluding:
- `node_modules`
- Development files
- `.env` files (use Coolify env vars)

## 🔄 Continuous Deployment

Coolify supports automatic deployments:

1. **Push to Deploy:**
   - Enable "Auto Deploy" in Coolify
   - Push to your Git branch
   - Coolify automatically rebuilds and redeploys

2. **Manual Deploy:**
   - Go to your application in Coolify
   - Click **Redeploy**
   - Coolify pulls latest code and rebuilds

## 🐛 Troubleshooting

### Build Fails

**Error:** `Cannot find module` or `ENOENT`
- **Solution:** Check that all dependencies are in `package.json`
- Run `npm ci` locally to verify

**Error:** `VITE_SUPABASE_URL is not defined`
- **Solution:** Environment variables must be set in Coolify before build
- Check spelling (must start with `VITE_`)

### App Loads But Features Don't Work

**Issue:** Supabase calls fail
- **Solution:** Verify environment variables are set correctly
- Check browser console for errors
- Verify Supabase URL and key are correct

**Issue:** 404 on page refresh
- **Solution:** nginx.conf should handle this (included)
- Verify nginx.conf was copied correctly

### Container Won't Start

**Error:** `nginx: [emerg] bind() to 0.0.0.0:80 failed`
- **Solution:** Port 80 might be in use
- Check Coolify port mapping
- Ensure only one container uses the same port

## 📊 Monitoring

Coolify provides:
- **Logs:** Real-time container logs
- **Metrics:** CPU, memory, network usage
- **Health Checks:** Automatic health monitoring (configured in Dockerfile)

## 🔐 Security Best Practices

✅ **Implemented:**
- Non-root nginx user
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- Hidden file access denied
- Minimal Alpine base images
- No secrets in Docker image

✅ **Recommended:**
- Use HTTPS (Coolify can provision SSL certificates)
- Regularly update base images
- Monitor logs for suspicious activity
- Implement rate limiting at reverse proxy level

## 🚀 Performance Optimization

The Docker setup includes:
- ✅ Gzip compression for text assets
- ✅ Long-term caching for static assets (1 year)
- ✅ Minimal image size (~50MB)
- ✅ Fast nginx static file serving
- ✅ Health checks for reliability

## 📝 Updating the Application

1. Make changes to your code
2. Commit and push to Git
3. Coolify automatically rebuilds (if auto-deploy enabled)
4. Or manually click **Redeploy** in Coolify

The multi-stage build ensures:
- Only changed layers are rebuilt
- Dependencies are cached when package.json hasn't changed
- Fast incremental builds

## 🆘 Support

If you encounter issues:
1. Check Coolify deployment logs
2. Verify environment variables
3. Test the Docker build locally:
   ```bash
   docker build -t ug-topup .
   docker run -p 8080:80 ug-topup
   ```
4. Check nginx logs inside container:
   ```bash
   docker exec <container-id> cat /var/log/nginx/error.log
   ```

## 🎯 Production Checklist

Before going live, ensure:
- ✅ All environment variables are set in Coolify
- ✅ Supabase credentials are correct
- ✅ Domain is pointed to Coolify
- ✅ SSL certificate is configured (HTTPS)
- ✅ Application loads and works correctly
- ✅ Authentication flow works
- ✅ All pages are accessible
- ✅ Images and assets load properly
- ✅ Auto-deploy is configured (if desired)

---

**Your UG TOP-UP app is now production-ready! 🎉**
