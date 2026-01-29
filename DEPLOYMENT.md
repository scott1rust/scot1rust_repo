# Deployment Guide - Blazing Paddles

This guide will walk you through deploying your Blazing Paddles application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- Your code pushed to a GitHub repository

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Initial commit - Blazing Paddles MVP"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"Add New..."** → **"Project"**
4. Import your GitHub repository

### 3. Configure Project Settings

Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 4. Environment Variables (Optional)

If you add a database or authentication later, you'll need to add environment variables:

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Environment Variables**
3. Add your variables (e.g., `DATABASE_URL`, `NEXTAUTH_SECRET`)

### 5. Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

### 6. Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Domains**
2. Add your domain
3. Update your DNS records as instructed by Vercel

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

## Post-Deployment Checklist

- [ ] Test the live application
- [ ] Verify all pages load correctly
- [ ] Test booking flow end-to-end
- [ ] Check responsive design on mobile
- [ ] Test navigation between tabs
- [ ] Verify credit calculations

## Monitoring and Analytics

### Built-in Vercel Analytics

1. Go to your project in Vercel
2. Click **Analytics** tab
3. View real-time traffic and performance metrics

### Speed Insights

Enable Vercel Speed Insights for performance monitoring:

```bash
npm install @vercel/speed-insights
```

Add to `app/layout.tsx`:

```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## Troubleshooting

### Build Fails

**Issue**: Build fails with TypeScript errors
**Solution**: Run `npm run build` locally first to catch errors

**Issue**: Missing dependencies
**Solution**: Ensure all dependencies are in `package.json`, not just `devDependencies`

### Runtime Errors

**Issue**: "Module not found" errors
**Solution**: Check import paths are correct and case-sensitive

**Issue**: Environment variables not working
**Solution**: Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access

### Performance Issues

**Issue**: Slow page loads
**Solution**: 
- Optimize images with Next.js Image component
- Implement code splitting
- Enable caching

## Updating Your Deployment

To update your live app:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically rebuild and deploy.

## Rollback

If something goes wrong:

1. Go to **Deployments** in Vercel dashboard
2. Find a previous working deployment
3. Click **"..."** → **"Promote to Production"**

## Production Optimization

### Before Going Live

1. **Remove Console Logs**: Clean up debug statements
2. **Error Handling**: Add proper error boundaries
3. **Loading States**: Add loading indicators
4. **SEO**: Add meta tags and Open Graph images
5. **Analytics**: Set up tracking (Google Analytics, Plausible, etc.)

### Performance Tips

- Use Next.js Image component for all images
- Implement lazy loading for heavy components
- Enable compression
- Use CDN for static assets (Vercel does this automatically)

## Security Considerations

- Never commit `.env` files with secrets
- Use environment variables for sensitive data
- Implement rate limiting for API routes (when added)
- Add CORS headers appropriately
- Keep dependencies updated

## Cost Considerations

### Vercel Free Tier Includes:
- Unlimited deployments
- 100 GB bandwidth per month
- Automatic HTTPS
- Preview deployments
- Analytics

### When to Upgrade:
- High traffic (>100 GB/month)
- Need team collaboration features
- Require advanced analytics
- Need priority support

## Next Steps After Deployment

1. **Share with stakeholders** - Get feedback on the MVP
2. **Monitor usage** - Track which features are used most
3. **Plan Phase 2** - Backend integration and database
4. **Implement authentication** - Member login system
5. **Add admin features** - Calendar management

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Your app is now live! 🎉**

Access it at: `https://your-project-name.vercel.app`
