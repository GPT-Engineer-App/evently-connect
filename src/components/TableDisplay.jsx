import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTables, fetchTableData } from '../lib/supabase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TableDisplay = () => {
  const [selectedTable, setSelectedTable] = useState('');

  const { data: tables, isLoading: tablesLoading, error: tablesError } = useQuery({
    queryKey: ['tables'],
    queryFn: fetchTables
  });

  const { data: tableData, isLoading: dataLoading, error: dataError } = useQuery({
    queryKey: ['tableData', selectedTable],
    queryFn: () => fetchTableData(selectedTable),
    enabled: !!selectedTable
  });

  if (tablesLoading) return <div>Loading tables...</div>;
  if (tablesError) return <div>Error loading tables: {tablesError.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Tables</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setSelectedTable} value={selectedTable}>
          <SelectTrigger>
            <SelectValue placeholder="Select a table" />
          </SelectTrigger>
          <SelectContent>
            {tables.map(table => (
              <SelectItem key={table} value={table}>{table}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedTable && (
          <>
            {dataLoading && <div>Loading table data...</div>}
            {dataError && <div>Error loading table data: {dataError.message}</div>}
            {tableData && (
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(tableData[0]).map(key => (
                      <TableHead key={key}>{key}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      {Object.values(row).map((value, cellIndex) => (
                        <TableCell key={cellIndex}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TableDisplay;
