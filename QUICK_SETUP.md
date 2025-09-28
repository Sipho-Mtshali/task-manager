# 🚀 Quick Setup Guide

## Step 1: Create Supabase Project (5 minutes)

1. **Go to [supabase.com](https://supabase.com)** and sign up/login
2. **Click "New Project"**
3. **Choose your organization** and create a new project
4. **Wait for setup** (takes 1-2 minutes)

## Step 2: Get Your Credentials

1. **Go to your project dashboard**
2. **Click "Settings" in the sidebar**
3. **Go to "API" section**
4. **Copy your credentials:**
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **Anon/Public key** (long string starting with `eyJ...`)

## Step 3: Update Configuration

### Option A: Environment Variables (Recommended)

1. **Create `.env` file** in your project root:
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **Replace the values** with your actual credentials

### Option B: Direct Configuration

1. **Open `lib/supabase.ts`**
2. **Replace the placeholder values:**
```typescript
const supabaseUrl = 'https://your-project-ref.supabase.co';
const supabaseAnonKey = 'your-anon-key-here';
```

## Step 4: Set Up Database

1. **Go to your Supabase project dashboard**
2. **Click "SQL Editor" in the sidebar**
3. **Run this SQL:**

```sql
-- Create tasks table
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  due_time TIME,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Step 5: Test the App

1. **Restart your development server:**
   ```bash
   npm start
   ```

2. **Open the app** and try to:
   - Create an account
   - Add a task
   - Test notifications

## 🔧 Troubleshooting

### "Invalid supabaseUrl" Error
- Make sure your URL starts with `https://`
- Check that you copied the full URL from Supabase

### "Invalid API key" Error
- Make sure you're using the "anon/public" key, not the "service_role" key
- Check that the key is complete (starts with `eyJ`)

### Database Connection Issues
- Make sure you ran the SQL schema
- Check that RLS policies are enabled
- Verify your project is active in Supabase

## 📱 Next Steps

Once everything is working:
1. **Test on mobile** with Expo Go app
2. **Test notifications** by setting future due dates
3. **Deploy to production** when ready

## 🆘 Need Help?

- Check the full [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions
- Review Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Check the console for any error messages
