import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const ledgerFilePath = path.resolve(process.cwd(), '../data/complicated_ledger.json');
// instead of getting data from database pick ledger from dummy file from data folder


interface Transaction {
  activity_id: string;
  date: string;
  type: string;
  amount: number;
  balance: number;
  [key: string]: any;
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const ledgerData:Transaction[] = JSON.parse(fs.readFileSync(ledgerFilePath, 'utf8'));
    const uniqueEntries:Record<string,boolean> = {}
    const uniqueData = ledgerData.filter((item)=>{
      if(!uniqueEntries[item.activity_id]){
        uniqueEntries[item.activity_id] = true
        return true;
      }
      return false;
    })    
    const sortedData = uniqueData.sort((a,b)=> parseInt(b.activity_id) - parseInt(a.activity_id))
    res.status(200).json(sortedData);
  } catch (error) {
    console.error('Error reading data from ledger.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
