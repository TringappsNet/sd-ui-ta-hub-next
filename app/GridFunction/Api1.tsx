// api.ts

interface Candidate {
    candidateId: number;
  }
  
  export async function fetchDataFromAPI(): Promise<Candidate[]> {
    try {
      const response = await fetch('http://localhost:8080/api/candidates/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
  
      const rowsWithId = data.map((row: Candidate) => ({
        ...row,
        id: row.candidateId
      }));
  
      return rowsWithId;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  