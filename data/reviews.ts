import type { Family, ProductRecord, Review } from "@/lib/types";

// Demo reviews. Each product gets a deterministic set drawn from family-specific
// lines, so ratings and counts stay stable between builds.

type Line = { rating: number; title: string; body: string };

const lines: Record<Family | "any", Line[]> = {
  floral: [
    { rating: 5, title: "Like walking past a florist", body: "Fresh flowers rather than perfume-counter flowers. I get compliments by lunchtime and it is still there at dinner." },
    { rating: 5, title: "My spring signature", body: "Soft enough for the office, pretty enough for a wedding. The drydown is my favourite part." },
    { rating: 4, title: "Lovely, a little sweet at first", body: "The first ten minutes are sweeter than I expected, then it settles into a clean, powdery floral that I really like." },
    { rating: 5, title: "Bought the large size", body: "Finished a sample in a week and came back for the 100 ml. It feels expensive in the best way." },
    { rating: 3, title: "Beautiful but quiet", body: "I love the smell but it stays very close to the skin on me. I reapply in the afternoon." },
  ],
  woody: [
    { rating: 5, title: "Effortless", body: "Dry, clean woods that never shout. Two sprays and I forget about it until someone asks what I am wearing." },
    { rating: 5, title: "Smells like a good coat", body: "Cedar and vetiver done with restraint. Works from a morning meeting to a late dinner." },
    { rating: 4, title: "Great all year", body: "Brighter in summer, cosier in winter. Longevity is solid, around seven hours on me." },
    { rating: 4, title: "Grown-up and calm", body: "Not a crowd-pleaser in the obvious way, which is exactly why I like it." },
    { rating: 3, title: "Good, not my favourite", body: "Well made but a little too dry for me. My partner loves it, so it stays." },
  ],
  amber: [
    { rating: 5, title: "Cashmere in a bottle", body: "Warm, resinous and quietly sweet. It lasts through the night and is still on my scarf in the morning." },
    { rating: 5, title: "The evening one", body: "This is what I wear when I want to feel dressed. Rich without being heavy." },
    { rating: 4, title: "Gorgeous drydown", body: "The opening is bright, then it melts into vanilla and amber. Use a light hand, it projects." },
    { rating: 5, title: "Worth every euro", body: "Nothing smells quite like it. Three sprays carry me through a full day in winter." },
    { rating: 3, title: "Too much for summer", body: "Beautiful in the cold, but cloying when it is hot out. I keep it for autumn." },
  ],
  fresh: [
    { rating: 5, title: "Clean and easy", body: "Like a cold shower and a fresh shirt. My go-to on hot days." },
    { rating: 4, title: "Bright, fades a bit quickly", body: "Smells wonderful, but it is gone after about four hours. I keep the small bottle in my bag." },
    { rating: 5, title: "Blind-buy success", body: "I bought it without testing and it is exactly what I hoped: salty, citrusy, light." },
    { rating: 5, title: "Holiday in a bottle", body: "Takes me straight back to the coast. Lovely layered over something woodier." },
    { rating: 4, title: "Perfect for work", body: "Inoffensive in the best sense. Nobody has ever complained and a few people have asked." },
  ],
  aromatic: [
    { rating: 5, title: "Sharp and refined", body: "Herbal, clean and confident. The lavender is beautiful and never feels old-fashioned." },
    { rating: 4, title: "Very versatile", body: "Office, gym, dinner; it works everywhere. Not unique, but extremely well done." },
    { rating: 5, title: "Instant compliment getter", body: "I get asked about it more than anything else I own. It lasts all day on me." },
    { rating: 4, title: "Strong opening", body: "Go easy for the first half hour. After that it settles into something smooth and aromatic." },
    { rating: 3, title: "Popular for a reason", body: "It is good, but I smell it on a lot of people. Still, it never lets me down." },
  ],
  chypre: [
    { rating: 5, title: "Elegant and a bit mysterious", body: "Fruit on top, patchouli underneath. It feels tailored, like a good blazer." },
    { rating: 5, title: "Twenty years later, still mine", body: "I have tried to replace it and keep coming back. Nothing else smells this composed." },
    { rating: 4, title: "Strong, beautiful sillage", body: "It fills a room. Two sprays are plenty for the office." },
    { rating: 4, title: "Better on skin than paper", body: "On the blotter it was too sharp; on skin it is warm and soft. Test it on yourself." },
    { rating: 5, title: "A grown-up classic", body: "Bold and refined at once. The drydown is especially good." },
  ],
  leather: [
    { rating: 5, title: "Soft leather, not a saddle", body: "Smooth and warm rather than smoky. Feels like a favourite jacket." },
    { rating: 4, title: "Great for autumn", body: "Rich and cosy. A little sweet in the drydown, which I did not mind." },
    { rating: 5, title: "Unexpectedly versatile", body: "I thought it would be too much, but it sits close and smells expensive." },
    { rating: 4, title: "Lovely leather and iris", body: "Powdery and smooth. Lasts well into the evening." },
  ],
  gourmand: [
    { rating: 5, title: "Like a warm hug", body: "Sweet but not sticky. I wear it on grey days and it always lifts my mood." },
    { rating: 5, title: "Lasts forever", body: "Still there the next morning. One spray is enough." },
    { rating: 4, title: "Sweet, in a good way", body: "Praline and vanilla, balanced by something fresh at the start. Very wearable." },
    { rating: 3, title: "A little too sweet for me", body: "Well made but too sugary for daytime. I keep it for winter evenings." },
  ],
  any: [
    { rating: 5, title: "Beautifully packed", body: "Arrived with two samples and a handwritten card. The perfume itself is wonderful." },
    { rating: 4, title: "Exactly as described", body: "The notes on the page match what I smell on skin. Delivery was quick." },
    { rating: 5, title: "Gift that landed", body: "Bought it for my partner; it is now theirs and mine. Lovely bottle too." },
  ],
};

const authors = [
  ["Clara M.", "Berlin"], ["Jonas K.", "Hamburg"], ["Sofia R.", "Milan"], ["Amélie D.", "Lyon"], ["Leon B.", "Vienna"],
  ["Hana S.", "Zürich"], ["Mateo G.", "Madrid"], ["Ines V.", "Lisbon"], ["Noah F.", "Munich"], ["Yara A.", "Amsterdam"],
  ["Elif T.", "Cologne"], ["Oskar L.", "Copenhagen"], ["Lea W.", "Frankfurt"], ["Karim H.", "Paris"], ["Mia P.", "Brussels"],
  ["Ana C.", "Barcelona"], ["Felix N.", "Stockholm"], ["Rosa E.", "Florence"], ["Theo J.", "Leipzig"], ["Nora Z.", "Dublin"],
];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function buildReviews(product: ProductRecord): Review[] {
  const pool = [...lines[product.family], ...lines.any];
  const seed = hash(product.slug);
  const count = 3 + ((seed + product.sold) % 6);
  const out: Review[] = [];
  for (let i = 0; i < count; i++) {
    const line = pool[(seed + i * 7) % pool.length];
    const [author, location] = authors[(seed + i * 11) % authors.length];
    const day = 1 + ((seed >> (i % 16)) % 27);
    const month = 1 + ((seed + i * 5) % 9);
    out.push({
      id: `${product.slug}-${i}`,
      productSlug: product.slug,
      author,
      location,
      rating: line.rating,
      title: line.title,
      body: line.body,
      date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      verified: (seed + i) % 4 !== 0,
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}
