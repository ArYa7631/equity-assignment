import React, { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { formatReadableDate } from "@/utils/commonFunc";
import { GLOBAL_CURRENCY } from "@/utils/constant";

interface Transaction {
    activity_id: string;
    date: string;
    type: string;
    amount: number;
    balance: number;
    source: {description?: string,[key:string]:any}
    destination: {description: string,[key:string]:any}
    [key: string]: any;
}

const InvestingAccount = () => {
    const [transactionLedger, setTransactionLedger] = useState<Transaction[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/getTransactionData');
                setTransactionLedger(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])
    const tableHeaders = ['Date', 'Transaction', 'Description', 'Amount', 'Balance'];
    return (
        <section>
            <div className="ml-auto mr-auto w-4/5">
                <h1 className=" text-[#b1b1b6] mt-5 mb-5">Investing Account</h1>

            </div>
            <div className="bg-[#dbdfe4]">
                <h1 className="ml-auto mr-auto w-4/5 pt-10 text-lg">$0</h1>
                <h1 className="ml-auto mr-auto w-4/5 text-[#b1b1b6] pb-10">Investing Account</h1>

            </div>
            <div className="ml-auto mr-auto mt-14 w-4/5">

                <h1 className="text-lg mb-5">Past Transactions</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {tableHeaders.map((header, index) => (
                                <TableHead key={index}>{header}</TableHead>
                            ))}
                        </TableRow>

                    </TableHeader>
                    <TableBody>
                        {transactionLedger.map((item) => (
                            <TableRow key={item.activity_id}>
                                <TableCell>{formatReadableDate(item.date)}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{`${item.type} from ${item?.source?.description || 'unknown'} to ${item.destination.description}`}</TableCell>
                                <TableCell>{GLOBAL_CURRENCY + item.amount}</TableCell>
                                <TableCell>{GLOBAL_CURRENCY + item.balance}</TableCell>
                            </TableRow>

                        ))}
                    </TableBody>

                </Table>
            </div>
        </section>
    )
};

export default InvestingAccount;
