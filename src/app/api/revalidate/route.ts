import { NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const tags = searchParams.get("tags") as string
  const secret = searchParams.get("secret") as string

  // Verify the secret to prevent unauthorized cache revalidation
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
  }

  if (!tags) {
    return NextResponse.json({ error: "No tags provided" }, { status: 400 })
  }

  const tagsArray = tags.split(",")

  await Promise.all(
    tagsArray.map(async (tag) => {
      console.log(`Revalidating tag: ${tag}`)

      switch (tag) {
        case "products":
          // Revalidate all product-related pages
          revalidatePath("/[countryCode]/(main)/store", "page")
          revalidatePath("/[countryCode]/(main)/products/[handle]", "page")
          revalidatePath("/[countryCode]/(main)", "page") // Home page with featured products
          revalidatePath("/[countryCode]/(main)/collections/[handle]", "page")
          revalidatePath("/[countryCode]/(main)/categories/[...category]", "page")
          // Revalidate the tag itself
          revalidateTag("products")
          break
        case "collections":
          revalidatePath("/[countryCode]/(main)/collections/[handle]", "page")
          revalidateTag("collections")
          break
        case "categories":
          revalidatePath("/[countryCode]/(main)/categories/[...category]", "page")
          revalidateTag("categories")
          break
        default:
          // Revalidate specific tag
          revalidateTag(tag)
      }
    })
  )

  return NextResponse.json({
    message: "Revalidated",
    tags: tagsArray,
    timestamp: new Date().toISOString()
  }, { status: 200 })
}
