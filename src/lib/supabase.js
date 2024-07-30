import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fdiufskxkampxwvmpxcj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkaXVmc2t4a2FtcHh3dm1weGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3MjQ1NDAsImV4cCI6MjAzNzMwMDU0MH0.GFt6ACxJVEUyBRD-pPoxfkd2-S2nd1gwSMLZEYbszRU'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const fetchTables = async () => {
  const { data, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')

  if (error) throw error
  return data.map(table => table.table_name)
}

export const createTables = async () => {
  const { error: eventsError } = await supabase.query(`
    CREATE TABLE IF NOT EXISTS events (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title VARCHAR(255) NOT NULL,
      description TEXT,
      date TIMESTAMP WITH TIME ZONE NOT NULL,
      location VARCHAR(255) NOT NULL,
      ticket_price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const { error: usersError } = await supabase.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      role VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const { error: ticketsError } = await supabase.query(`
    CREATE TABLE IF NOT EXISTS tickets (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      event_id UUID REFERENCES events(id),
      user_id UUID REFERENCES users(id),
      status VARCHAR(50) NOT NULL,
      purchase_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const { error: feedbackError } = await supabase.query(`
    CREATE TABLE IF NOT EXISTS feedback (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id),
      feedback_type VARCHAR(50) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  if (eventsError || usersError || ticketsError || feedbackError) {
    throw new Error('Error creating tables');
  }

  console.log('Tables created successfully');
}

export const fetchTableData = async (tableName) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')

  if (error) throw error
  return data
}
