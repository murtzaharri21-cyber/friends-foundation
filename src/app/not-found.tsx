import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container-ff py-24 text-center md:py-32">
        <h1 className="text-4xl md:text-5xl">We couldn’t find that page</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-slate-600">
          It may have moved or no longer exists. Try the home page, or have a look at our work.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Go to the home page
          </Link>
          <Link href="/our-work" className="btn btn-ghost">
            What we do
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
