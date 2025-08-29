# GuardFleetAgency - Military-Grade Shipping & Logistics

A comprehensive shipping and tracking website built with Next.js, featuring military-inspired design and robust functionality for both customers and administrators.

## Features

### Customer Features
- **Package Tracking**: Real-time tracking with detailed shipment history
- **Service Information**: Comprehensive shipping service details
- **Contact Support**: Multiple ways to reach customer service
- **Responsive Design**: Works seamlessly on all devices

### Admin Features
- **Dashboard**: Overview of shipments and key metrics
- **Shipment Management**: Create, edit, and track all shipments
- **Status Updates**: Update shipment status with automatic email notifications
- **Authentication**: Secure admin access with role-based permissions

### Technical Features
- **Database Integration**: Supabase for data storage and authentication
- **Email Notifications**: Automated emails for shipment updates
- **Real-time Updates**: Live tracking information
- **Military-Inspired Design**: Navy Blue, Army Green, and Gold color scheme

## Getting Started

### Prerequisites
- Node.js 18+ 
- Supabase account
- Email service (optional, for notifications)

### Installation

1. **Clone and Install**
   \`\`\`bash
   git clone <repository-url>
   cd guard-fleet-agency
   npm install
   \`\`\`

2. **Database Setup**
   - Run the SQL scripts in the `scripts/` folder in order:
     - `001_create_shipments_schema.sql`
     - `002_seed_sample_data.sql` 
     - `003_create_admin_user.sql`

3. **Environment Variables**
   The following environment variables are automatically configured:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

### Admin Access

1. **Create Admin User**
   - Run the `003_create_admin_user.sql` script
   - Sign up at `/auth/signup` with the email used in the script
   - The user will automatically have admin privileges

2. **Access Admin Dashboard**
   - Navigate to `/admin` after logging in
   - Manage shipments, view analytics, and update tracking

## Project Structure

\`\`\`
├── app/
│   ├── admin/           # Admin dashboard pages
│   ├── api/             # API routes
│   ├── auth/            # Authentication pages
│   ├── track/           # Package tracking
│   └── [pages]/         # Public pages
├── components/          # Reusable components
├── lib/                 # Utilities and configurations
├── scripts/             # Database scripts
└── public/              # Static assets
\`\`\`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy the `.next` folder to your hosting provider
3. Ensure environment variables are configured

## Sample Data

The application includes sample tracking numbers for testing:
- `GFA001234567890` - In Transit
- `GFA001234567891` - Out for Delivery  
- `GFA001234567892` - Delivered

## Support

For technical support or questions:
- Email: support@guardfleetagency.com
- Phone: 1-800-GUARD-FL (1-800-482-7335)
- Contact form: Available at `/contact`

## License

This project is proprietary software for GuardFleetAgency.
\`\`\`

```tsx file="" isHidden
