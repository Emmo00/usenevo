import Link from "next/link"
import { ArrowRight } from "lucide-react"
import DashboardMockupImage from "@/components/dashboard-mockup-image"
import NevoLogo from "@/components/logos/nevo"
import { ConnectBtn } from "@/components/connectButton"
import GoToDashboardBtn from "@/components/goToDashboardBtn"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <NevoLogo className="h-8 w-8" />
          <span className="text-xl font-bold">Nevo</span>
        </Link>
        <nav className="flex items-center gap-6">
          <ConnectBtn />
          <div className="hidden md:block">
            <GoToDashboardBtn>Get Started</GoToDashboardBtn>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-16 text-center md:py-24">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Where creators do invoices.</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Nevo is the platform that helps professional creators send and manage invoices.
        </p>
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <GoToDashboardBtn>
            Start sending invoices
            <ArrowRight className="h-4 w-4" />
          </GoToDashboardBtn>
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">2</span> invoices have been sent from Nevo.
        </p>
      </section>

      {/* Dashboard Mockup */}
      <section className="container mx-auto px-4 py-4 md:py-8">
        <div className="overflow-hidden rounded-lg border bg-background shadow-xl">
          <DashboardMockupImage />
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Crypto-Friendly Invoicing</h3>
            <p className="text-muted-foreground">
              Accept payments in stablecoins and other cryptocurrencies with ease.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Web3 Native</h3>
            <p className="text-muted-foreground">
              Connect your wallet and manage your invoices with blockchain security.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Built for Creators</h3>
            <p className="text-muted-foreground">Designed specifically for freelancers and digital creators.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container mx-auto px-4 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2">
                <NevoLogo className="h-6 w-6" />
                <span className="text-lg font-bold">Nevo</span>
              </Link>
              <p className="text-sm text-muted-foreground">Invoice like a pro with Nevo</p>
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} - All rights reserved</p>

            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Free Tools</h3>
                <Link href="#" className="text-sm text-muted-foreground hover:underline">
                  Get Arbitrum USDC (native)
                </Link>
                <h3 className="mt-4 text-sm font-medium">Invoice</h3>
                <Link href="#" className="text-sm text-muted-foreground hover:underline">
                  Send via email
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Legal</h3>
                <Link href="#" className="text-sm text-muted-foreground hover:underline">
                  Terms of Service
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:underline">
                  Privacy Policy
                </Link>
                <h3 className="mt-4 text-sm font-medium">Company</h3>
                <Link href="https://twitter.com/usenevo" className="text-sm text-muted-foreground hover:underline">
                  @usenevo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
