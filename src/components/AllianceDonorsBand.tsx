import Image from "next/image";

const alliancePartners = [
  { name: "United Nations Development Programme", logo: "tp1.jpg", width: 425, height: 408 },
  { name: "United States Agency for International Development", logo: "tp2.png", width: 312, height: 234 },
  { name: "World Health Organization", logo: "tp3.png", width: 221, height: 228 },
  { name: "United Nations Office for the Coordination of Humanitarian Affairs", logo: "tp4.png", width: 256, height: 256 },
  { name: "United Nations Office for Project Services", logo: "tp5.png", width: 900, height: 500 },
  { name: "UN-Habitat", logo: "tp6.png", width: 229, height: 220 },
];

export default function AllianceDonorsBand() {
  const renderPartnerLogos = (duplicate = false) => (
    <ul
      className="alliance-donors-logos"
      aria-label={duplicate ? undefined : "Alliance partners and donors"}
      aria-hidden={duplicate || undefined}
    >
      {alliancePartners.map((partner) => (
        <li key={partner.name}>
          <Image
            src={`/images/ff/${partner.logo}`}
            alt={partner.name}
            width={partner.width}
            height={partner.height}
            loading="lazy"
            draggable={false}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="alliance-donors-band" aria-labelledby="alliance-donors-heading">
      <div className="alliance-donors-inner">
        <p className="alliance-donors-kicker">
          <span aria-hidden="true">—</span> Together We Grow <span aria-hidden="true">—</span>
        </p>
        <h2 id="alliance-donors-heading" className="scroll-reveal">Our Alliance, Partnerships &amp; Donors</h2>
        <div className="alliance-donors-marquee scroll-reveal scroll-reveal-scale">
          <div className="alliance-donors-track">
            {renderPartnerLogos()}
            {renderPartnerLogos(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
