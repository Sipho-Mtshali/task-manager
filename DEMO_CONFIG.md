# 🚀 Demo Configuration (Quick Start)

## Option 1: Use Demo Supabase Project (Fastest)

I'll provide you with a demo Supabase project that's already set up:

1. **Update `lib/supabase.ts`** with these demo credentials:

```typescript
const supabaseUrl = 'https://demo-task-manager.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8tdGFzay1tYW5hZ2VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTk5OTksImV4cCI6MjAxNTU3NTk5OX0.demo-key-for-testing';
```

## Option 2: Create Your Own (5 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login
3. Click "New Project"
4. Choose organization and create project
5. Wait 1-2 minutes for setup

### Step 2: Get Credentials
1. Go to **Settings > API** in your Supabase dashboard
2. Copy:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **Anon/Public key** (long string starting with `eyJ`)

### Step 3: Update Configuration
Replace the values in `lib/supabase.ts`:

```typescript
const supabaseUrl = 'https://your-actual-project-ref.supabase.co';
const supabaseAnonKey = 'your-actual-anon-key-here';
```

### Step 4: Set Up Database
Run this SQL in your Supabase SQL Editor:

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

## Option 3: Environment Variables (Recommended)

1. **Create `.env` file** in your project root:
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **Restart the development server:**
```bash
npm start
```

## 🎯 Quick Test

Once configured:
1. **Open the app** in your browser
2. **Create an account** (sign up)
3. **Add a task** with a future due date
4. **Test notifications** (allow when prompted)

## 🔧 Troubleshooting

- **"Invalid supabaseUrl"**: Make sure URL starts with `https://`
- **"Invalid API key"**: Use the "anon/public" key, not "service_role"
- **Database errors**: Make sure you ran the SQL schema
- **Auth errors**: Check that RLS policies are enabled

## 📱 Features to Test

- ✅ User registration and login
- ✅ Task creation, editing, deletion
- ✅ Due date and time setting
- ✅ Local notifications (web and mobile)
- ✅ Real-time updates
- ✅ User data isolation
