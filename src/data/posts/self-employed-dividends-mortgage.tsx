import Image from "next/image";
import Link from "next/link";
import type { Post, PostFaq as Faq } from "./types";
import PostFaq from "@/components/blog/PostFaq";
import { BookCallButton, CopyEmail } from "@/components/blog/ArticleActions";

const IMG = "/blog/self-employed-dividends-mortgage";
const EMAIL = "jkarkoukly@sherwoodmortgagegroup.com";
const CRA_URL =
  "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12000-taxable-amount-dividends-eligible-other-than-eligible-taxable-canadian-corporations.html";
const FCAC_URL = "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html";

const faq: Faq[] = [
  {
    q: "Do lenders count dividends as income?",
    a: "Yes. Lenders look at the dividends on your personal tax return. Some use line 15000, which includes the extra 15% CRA adds. Others use the dividends you actually received. Plan on the lower number.",
  },
  {
    q: "What is line 15000?",
    a: "Line 15000 is the total income line on your personal tax return. It also shows up on your Notice of Assessment. It's the main number lenders look at when you're self-employed.",
  },
  {
    q: "Does money left in my company count?",
    a: "Not at most banks. Some alternative lenders will count it. Expect a higher rate and more paperwork.",
  },
  {
    q: "Is salary better than dividends for a mortgage?",
    a: "Both count. Some lenders see salary as more stable, and it needs fewer documents. Your total personal income is what matters.",
  },
  {
    q: "What's an add-back?",
    a: "It's when a lender adds some of your business write-offs back to your income. It helps your tax return reflect what you really earned.",
  },
  {
    q: "What is a B lender?",
    a: "A B lender is an alternative lender that looks at your business differently than the big banks. Some use bank statements instead of tax returns. Rates and fees are usually higher, and most people use one for a year or two.",
  },
  {
    q: "How many years of income do I need?",
    a: "Two years in business and two years of tax returns.",
  },
  {
    q: "Can I buy with less than 20% down if I'm self-employed?",
    a: "It's hard. Plan on 20%. With less, your options shrink a lot.",
  },
  {
    q: "What if my income dropped last year?",
    a: "Some lenders use your most recent year if income dropped at all. Others still use your two-year average if the drop is small. I'll match you to the lender whose rule fits your numbers.",
  },
  {
    q: "What if I've been self-employed less than two years?",
    a: "Most lenders want two years. Reach out before you apply so you know where you stand.",
  },
];

function Bar({ label, value, pct, tone }: { label: string; value: string; pct: number; tone?: "navy" | "coral" }) {
  return (
    <div className="bar">
      <span className="lab">{label}</span>
      <span className="track">
        <span className={`fill${tone ? ` fill-${tone}` : ""}`} style={{ width: `${pct}%` }} />
      </span>
      <span className="val">{value}</span>
    </div>
  );
}

function Body() {
  return (
    <>
      <div className="answer">
        <div className="label">Short answer</div>
        <p>
          <b>Yes.</b> Dividends count as income. But lenders look at your personal tax return, not what your company
          earns. If you pay yourself a small dividend to save tax, you&apos;ll qualify for less. Start planning a couple of
          years before you want to buy, if you can.
        </p>
      </div>

      <aside className="takeaways" aria-labelledby="kt">
        <h2 id="kt">Key takeaways</h2>
        <ul>
          <li>Lenders qualify you on your personal tax return, not your company&apos;s profit.</li>
          <li>Most lenders average your last two years. When your income changes, each lender has its own rule.</li>
          <li>Money left in your company doesn&apos;t count at most banks.</li>
          <li>Paying yourself $120,000 instead of $75,000 can mean about $213,000 more mortgage.</li>
          <li>Plan on 20% down and start about two years before you buy.</li>
        </ul>
      </aside>

      <div className="intro">
        <figure className="family">
          <Image
            src={`${IMG}/jesse-family-walk.jpg`}
            alt="Jesse Karkoukly with his kid on a sunny walk in Toronto"
            width={900}
            height={1200}
            sizes="(max-width: 640px) 320px, 240px"
          />
        </figure>
        <div>
          <p>
            I&apos;m Jesse, a mortgage agent in Toronto. I work with a lot of incorporated business owners. I get this
            question a lot.
          </p>
          <span className="sig">
            Jesse<span className="coral">.</span>
          </span>
        </div>
      </div>

      <details className="toc" open>
        <summary>In this article</summary>
        <ol>
          <li><a href="#how-lenders-qualify">How lenders look at your income</a></li>
          <li><a href="#dividends-on-your-return">Why your return shows more</a></li>
          <li><a href="#income-changes">When your income changes</a></li>
          <li><a href="#add-backs">What add-backs are</a></li>
          <li><a href="#example">A real example, with the math</a></li>
          <li><a href="#options">If your income is too low</a></li>
          <li><a href="#watch-outs">What hurts your file</a></li>
          <li><a href="#documents">Documents you&apos;ll need</a></li>
          <li><a href="#when-to-start">When to start preparing</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ol>
      </details>

      <section id="how-lenders-qualify">
        <h2>How do lenders look at self-employed income?</h2>
        <p>
          Lenders look at your personal tax returns from the last two years, not your company&apos;s books. Five rules
          decide your number.
        </p>
        <ol className="rules">
          {[
            ["You need two years.", "Most lenders want two years in business and two years of personal tax returns."],
            [
              "Lenders use line 15000 on your tax return.",
              "That's your total income. It shows up on your T1 General and your Notice of Assessment (NOA).",
            ],
            [
              "Lenders average your last two years.",
              "If your income changed a lot between those years, each lender has its own rule. More on that below.",
            ],
            ["Your taxes must be paid.", "Your NOA should show nothing owing to CRA."],
            ["Money left in your company doesn't count at most banks.", "Only what you pay yourself counts."],
          ].map(([title, text], i) => (
            <li key={title}>
              <span className="n">{i + 1}</span>
              <div>
                <b>{title}</b>
                <span className="t">{text}</span>
              </div>
            </li>
          ))}
        </ol>
        <p className="note">
          <b>Plan on 20% down.</b> Self-employment with less than 20% down is a real challenge. Your options shrink a
          lot.
        </p>
      </section>

      <section id="dividends-on-your-return">
        <h2>Heads up: your tax return shows more than you got</h2>
        <p>
          When you pay yourself a dividend, CRA adds 15% to it on your tax return. That&apos;s the gross-up on
          non-eligible dividends, the kind most small business owners get (
          <a href={CRA_URL} target="_blank" rel="noopener noreferrer">
            CRA
          </a>
          ).
        </p>
        <p className="equation num" aria-label="$75,000 times 1.15 equals $86,250">
          <span>$75,000</span>
          <span className="op">× 1.15 =</span>
          <span className="res">$86,250</span>
        </p>
        <p>$75,000 in dividends shows up as $86,250 on line 15000.</p>
        <p>
          Some lenders use that higher number. Others use the $75,000 you actually got.{" "}
          <b>Plan on the lower number.</b> If your lender uses the higher one, that&apos;s a bonus.
        </p>
      </section>

      <section id="income-changes">
        <h2>What happens if your income went up or down?</h2>
        <p>
          Every lender treats a change in income differently. There&apos;s no single rule. Here&apos;s how three major
          lenders handle it, based on their lender guidelines as of October 2026.
        </p>
        <p>
          <b>Say you made $100,000 last year and $80,000 this year.</b> That&apos;s a 20% drop. Your two-year average is
          ($100,000 + $80,000) ÷ 2 = $90,000.
        </p>
        <div className="table-wrap" tabIndex={0} role="group" aria-label="Scrollable table">
          <table>
            <caption>Income each lender would use: $100,000 last year, $80,000 this year</caption>
            <thead>
              <tr>
                <th scope="col">Lender</th>
                <th scope="col">Their rule</th>
                <th scope="col" className="money">Uses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">One major bank</th>
                <td>
                  Two-year average only if income stayed flat or went up. If it dropped at all, they use your most recent
                  year. A drop of more than 20% gets a closer look.
                </td>
                <td className="money">$80,000</td>
              </tr>
              <tr>
                <th scope="row">A large lender</th>
                <td>Uses your most recent year if your income dropped at all.</td>
                <td className="money">$80,000</td>
              </tr>
              <tr className="hl">
                <th scope="row">Another major bank</th>
                <td>
                  Two-year average unless either year is more than 20% above or below it. Then the lower year, unless
                  their credit team signs off.
                  <span className="sub">$80,000 is 11.1% below $90,000 ($10,000 ÷ $90,000). Under 20%.</span>
                </td>
                <td className="money">$90,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          $80,000 gets you a mortgage of about <b>$270,000</b>. $90,000 gets you about <b>$318,000</b>. Same tax
          returns, about <b>$48,000 difference</b>, just from the lender.
        </p>
        <p className="small">
          Based on a 4.74% 5-year fixed rate, 25-year amortization, 20% down and $750 a month in property tax and heat.
        </p>
        <p className="pull">
          This is the core of what I do. It&apos;s not just finding a lender that says yes. It&apos;s a balance. We find
          the lender where you qualify, with a strong rate and a mortgage that fits you.
        </p>
      </section>

      <section id="add-backs">
        <h2>What are add-backs?</h2>
        <p>
          An <b>add-back</b> is when a lender adds some of your business write-offs back to your income. A{" "}
          <b>gross-up</b> is when a lender adds a flat 15% instead.
        </p>
        <p>
          Why it matters: write-offs like your home office and car lower your tax. They also lower the income a lender
          sees.
        </p>
        <div
          className="bars"
          role="img"
          aria-label="Tax return shows $70,000. With a 15% gross-up, $80,500. With add-backs, up to $93,000."
        >
          <Bar label="Tax return" value="$70,000" pct={75.3} />
          <Bar label="15% gross-up" value="$80,500" pct={86.6} tone="navy" />
          <Bar label="Add-backs" value="$93,000" pct={100} tone="coral" />
        </div>
        <p className="small">Example: a $70,000 tax return with $23,000 in write-offs. $70,000 × 1.15 = $80,500.</p>
        <p>
          <b>The catch if you&apos;re incorporated:</b> most lenders only offer this to people who aren&apos;t
          incorporated. One major bank will gross up your salary and dividends if you have 20% down and steady income.
          Some B lenders will count money you kept in the company.
        </p>
      </section>

      <div className="chat">
        <span className="kicker">Real client question</span>
        <div className="bubble bubble-q">
          <span className="from">Client</span>
          &ldquo;How does the way I pay myself, salary, dividends, or a mix, affect what I qualify for?&rdquo;
        </div>
        <div className="bubble bubble-a">
          <span className="from">Jesse</span>
          Lenders care about the total on line 15000 of your personal return, over two years. Salary, dividends or a mix
          all count. Salary needs fewer documents. Dividends need your company paperwork too. The biggest lever is how
          much you pay yourself in total. Talk to me before your next tax year, not the month you want to buy. I&apos;ll
          show you what each option means for your mortgage.
        </div>
      </div>

      <section id="example">
        <h2>How much can you borrow? A real example, with the math</h2>
        <p>
          It depends mostly on how much you pay yourself. In this example, the same business qualifies for anywhere from
          about $247,000 to $460,000.
        </p>
        <p>
          An incorporated consultant in Toronto. The company makes $160,000 a year in profit. They have 20% down and no
          other debts.
        </p>
        <ul className="assume">
          <li>
            5-year fixed <b>4.74%</b>
          </li>
          <li>
            Property tax + heat <b>$750</b>/month
          </li>
          <li>
            <b>25-year</b> amortization
          </li>
        </ul>
        <p>
          <b>The stress test:</b> You have to qualify at your rate plus 2%. Here, that&apos;s 6.74%.{" "}
          <Link href="/services/first-time-buyers#how-to-qualify">How the stress test works</Link>
        </p>
        <p className="small">
          4.74% is one of the best 5-year fixed rates I&apos;m seeing this month for 20% down. The math uses the
          dividends actually paid, the safer number.
        </p>
        <div className="table-wrap" tabIndex={0} role="group" aria-label="Scrollable table">
          <table>
            <caption>Maximum mortgage by how the owner pays themselves</caption>
            <thead>
              <tr>
                <th scope="col">Option</th>
                <th scope="col">Income used</th>
                <th scope="col">Monthly mortgage budget</th>
                <th scope="col" className="money">Max mortgage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">A: $75,000 dividends both years</th>
                <td className="num">$75,000</td>
                <td className="num">$6,250 × 39% = $2,437.50, minus $750 = $1,687.50</td>
                <td className="money">$247,000</td>
              </tr>
              <tr className="hl">
                <th scope="row">B: $120,000 dividends both years</th>
                <td className="num">$120,000</td>
                <td className="num">$10,000 × 39% = $3,900, minus $750 = $3,150</td>
                <td className="money">$460,000</td>
              </tr>
              <tr>
                <th scope="row">C: $75,000, then $120,000</th>
                <td className="num">Average: ($75,000 + $120,000) ÷ 2 = $97,500</td>
                <td>
                  Most lenders use the average
                  <span className="sub">
                    At the bank with the 20% rule: $120,000 is 23% above the average ($22,500 ÷ $97,500), so they use the
                    lower year. Max mortgage about $247,000.
                  </span>
                </td>
                <td className="money">$353,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="bars"
          role="img"
          aria-label="Maximum mortgage: Option A $247,000, Option C $353,000, Option B $460,000"
        >
          <Bar label="Option A" value="$247,000" pct={53.7} />
          <Bar label="Option C" value="$353,000" pct={76.7} tone="navy" />
          <Bar label="Option B" value="$460,000" pct={100} tone="coral" />
        </div>
        <p>
          Want your own number? Try the <Link href="/calculators/required-income">required income calculator</Link> or
          the <Link href="/calculators/affordability">affordability calculator</Link>.
        </p>
        <p className="verdict">
          Same business. Same profit. Option B gets <b>$213,000 more</b> than Option A. Option C shows why one big year
          isn&apos;t enough. You need two steady years.
        </p>
      </section>

      <section id="options">
        <h2>What if your income on paper is too low?</h2>
        <p>You have three real options.</p>
        <div className="option">
          <span className="ic">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 17l6-6 4 4 8-8" />
              <path d="M15 7h6v6" />
            </svg>
          </span>
          <div>
            <h3>1. Pay yourself more for two years</h3>
            <p>
              You pay more personal tax. You qualify for more. I&apos;ll show you how much more home it buys, so you can
              weigh it against the tax.
            </p>
          </div>
        </div>
        <div className="option">
          <span className="ic">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 21h18" />
              <path d="M5 21V10l7-5 7 5v11" />
              <path d="M9 21v-6h6v6" />
            </svg>
          </span>
          <div>
            <h3>2. Use an alternative lender</h3>
            <p>These are often called B lenders. They look at your business differently than the big banks do.</p>
            <ul>
              <li>Some use 6 or 12 months of business bank statements instead of your tax returns</li>
              <li>Some add back money you kept in the company</li>
              <li>You&apos;ll need proof you own the business and a CRA statement showing no tax owing</li>
              <li>20% down payment or more</li>
              <li>More flexible on credit</li>
              <li>
                Rates I&apos;m seeing this month start around 4.9% to 5.5% on 1 to 3 year terms, often plus a 1% lender
                fee
              </li>
            </ul>
            <p>
              Most people use a B lender for one or two years. Then they move to a bank once their tax returns catch up.
            </p>
          </div>
        </div>
        <div className="option option-last">
          <span className="ic">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16" />
              <path d="M14 6l6 6-6 6" />
            </svg>
          </span>
          <div>
            <h3>3. Find a lender with a higher debt limit</h3>
            <p>
              Most lenders cap your total debt payments at 44% of your income. Some go up to 55%. That can close a small
              gap without changing your income.
            </p>
          </div>
        </div>
        <aside className="story" aria-labelledby="story-h">
          <span className="kicker">A real client story</span>
          <h3 id="story-h">&ldquo;Can my dividends count too?&rdquo;</h3>
          <p>
            A Toronto consultant came to me with a full-time job and a small consulting company on the side. He paid
            himself dividends from the company, and one bank had already approved him.
          </p>
          <p>
            His question: could his dividends count too? Yes, and I wanted them on the file. I pulled two years of his
            tax returns and dividend slips so his company income was part of the picture.
          </p>
          <p>
            I also ran his down payment both ways. Putting 20% down instead of 15% saved him about $18,000 in mortgage
            insurance.
          </p>
          <p className="win">
            Then I shopped it. A second major bank came back with a 3-year fixed at 4.39%. He had two approvals in hand
            and the leverage to take the better deal.
          </p>
        </aside>
      </section>

      <section id="watch-outs">
        <h2>What hurts a self-employed mortgage application?</h2>
        <ul className="list">
          <li>
            <b>Tax owing to CRA.</b> Pay it before you apply.
          </li>
          <li>
            <b>Business debts on your credit report.</b> If a car lease, equipment loan or business credit card shows up
            on your personal credit report, lenders count it against you. Even if the company pays it.
          </li>
          <li>
            <b>Income that dropped.</b> Many lenders will use your lower year. Rules vary, so the lender you pick
            matters.
          </li>
        </ul>
      </section>

      <section id="documents">
        <h2>What documents do you need if you&apos;re incorporated?</h2>
        <p>If you pay yourself in dividends, here&apos;s the list. Tick them off as you go.</p>
        <ul className="check">
          {[
            "Two years of personal tax returns (T1 General)",
            "Two years of Notices of Assessment, showing nothing owing",
            "Your T5 slips (T4 slips if you also take salary)",
            "Two years of company financial statements, or your T2 corporate tax returns",
            "Articles of incorporation, or a corporate search showing you own the company",
            "Six months of business bank statements",
            "90 days of history on your down payment",
          ].map((doc, i) => (
            <li key={doc}>
              <label>
                <input type="checkbox" id={`doc-${i + 1}`} />
                <span>{doc}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section id="when-to-start">
        <h2>When should you start preparing?</h2>
        <p>
          Ideally, about two years before you buy. Lenders look at your last two tax returns, so that gives you breathing
          room to adjust how you pay yourself and let it show up on paper.
        </p>
        <p>
          But life moves fast. Maybe you found the place, or the timing just feels right. Wherever you&apos;re at, reach
          out. I&apos;ll look at your numbers and tell you honestly if now makes sense.
        </p>
      </section>

      <PostFaq items={faq} />

      <aside className="ask" aria-labelledby="ask-h">
        <div>
          <h2 id="ask-h">Got a question I didn&apos;t cover?</h2>
          <p>Drop me a line, would love to hear it!</p>
        </div>
        <a className="btn btn-ghost" href={`mailto:${EMAIL}?subject=Self-employed%20mortgage%20question`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          Start the conversation
        </a>
        <div className="ask-row">
          <CopyEmail email={EMAIL} />
        </div>
      </aside>

      <section className="bottom-line" id="bottom-line">
        <h2>The bottom line</h2>
        <p className="big">
          Dividends don&apos;t stop you from getting a mortgage. What you pay yourself is what counts.{" "}
          <span className="coral">Plan it two years out.</span>
        </p>
        <p>
          If you&apos;re incorporated and thinking about buying, let&apos;s talk. I&apos;ll show you what a lender will
          see, and how to get to the number you need. There&apos;s no cost to you.
        </p>
        <p>If you&apos;re thinking about buying or just have a question about anything mortgage related, reach out.</p>
        <div className="contact-row">
          <BookCallButton />
          <a className="contact-link" href="tel:+14162762666">
            416-276-2666
          </a>
          <a className="contact-link" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      </section>
    </>
  );
}

const post: Post = {
  slug: "self-employed-dividends-mortgage",
  h1: "Can I get a mortgage if I'm self-employed and pay myself in dividends?",
  headline: "Can I Get a Mortgage If I'm Self-Employed and Pay Myself in Dividends?",
  metaTitle: "Mortgage on Dividend Income: Self-Employed Guide (Ontario)",
  metaDescription:
    "Yes, you can get a mortgage paid in dividends. How lenders read your income, real math, and what to fix before you apply.",
  teaser:
    "Yes, dividends count. But lenders read your personal tax return, not your company's profit. How lenders read dividend income, the real math, and what to fix before you apply.",
  category: "Self-Employed Mortgages",
  published: "2026-10-09",
  updated: "2026-10-13",
  readMinutes: 8,
  wordCount: 1900,
  keywords: [
    "self-employed mortgage",
    "mortgage with dividend income",
    "incorporated business owner mortgage Ontario",
    "line 15000 mortgage",
    "salary vs dividends mortgage",
    "business for self mortgage Toronto",
  ],
  image: {
    src: `${IMG}/jesse-family-walk.jpg`,
    alt: "Jesse Karkoukly with his kid on a sunny walk in Toronto",
    width: 900,
    height: 1200,
  },
  faq,
  mentions: ["Line 15000", "Mortgage stress test", "B lender", "Add-back"],
  sources: [
    { label: "CRA: Line 12000, taxable amount of dividends", url: CRA_URL },
    { label: "FCAC: Preparing to get a mortgage (stress test)", url: FCAC_URL },
  ],
  Body,
};

export default post;
