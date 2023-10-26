import Image from 'next/image'
import { Inter } from 'next/font/google'
import InvestingAccount from '@/components/investing-account'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
    >
      <InvestingAccount />
    </main>
  )
}
