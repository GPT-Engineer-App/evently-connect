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

export const fetchTableData = async (tableName) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')

  if (error) throw error
  return data
}
