import { Metadata } from "next"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

type Params = Promise<{
  countryCode: string
}>

export default async function CountryLayout({
  children,
}: {
  children: React.ReactNode
  params: Params
}) {
  return <>{children}</>
}
