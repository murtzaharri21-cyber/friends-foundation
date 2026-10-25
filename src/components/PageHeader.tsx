import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function PageHeader({
  title,
  intro,
  crumbs = [],
  image,
  imageAlt,
  imageCaption,
}: {
  title: string;
  intro?: string;
  eyebrow?: string;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}) {
  return (
    <section
      className="relative overflow-hidden border-b border-line/70"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage:
          "linear-gradient(178deg, #f2f8fd 0%, #ffffff 70%), radial-gradient(circle at 90% 10%, rgba(54,143,201,0.12), transparent 44%)",
      }}
    >
      <div className={`container-ff relative py-12 md:py-16 ${image ? "grid items-center gap-10 lg:grid-cols-12" : ""}`}>
        <div className={image ? "lg:col-span-7" : "max-w-3xl"}>
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[14px] text-muted">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {c.href ? (
                      <Link href={c.href} className="hover:text-brand hover:underline">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-ink/80">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <h1 className={`${crumbs.length ? "mt-3" : ""} text-deep-2`}>{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-[1.12rem] leading-relaxed text-ink/75">{intro}</p>}
        </div>

        {image && (
          <figure className="lg:col-span-5">
            <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white p-2 shadow-[0_24px_60px_rgba(44,117,165,0.16)]">
              <img
                src={image}
                alt={imageAlt ?? imageCaption ?? ""}
                className="aspect-[4/3] w-full rounded-[16px] object-cover"
              />
            </div>
            {imageCaption && <figcaption className="mt-3 text-sm text-muted">{imageCaption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}
