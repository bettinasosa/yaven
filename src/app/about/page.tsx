import type { Metadata } from "next"
import { AgencyEditorial, EditorialSection } from "@/components/agency-editorial"

export const metadata: Metadata = {
  title: "Two founders and a team of agents | yaven",
  description: "yaven was founded by Betts Sosa and Nick Price in London. We run our own company on yaven, and what we learn goes into every agency we work with.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return <AgencyEditorial title="Two founders and a team of agents." intro="yaven was founded by Betts Sosa and Nick Price in London. We run our own company on yaven. Agents handle our research, prospecting, market tracking and inbox, and what we learn goes into every agency we work with.">
    <EditorialSection title="Why we started yaven">
      <p>We started yaven to run our own company. Two of us were doing the work of a full team: research, sales, client calls, product and every follow-up in between. We built agents to carry the load, and our week changed. They surfaced leads we would have missed and prepared each call before we joined it.</p>
      <p>Then we showed it to agency owners and fractional leaders. Most had the same problem, and none had the time to build the fix. They already paid for ChatGPT and Claude. What they lacked was AI which knew their clients and did the work without being asked.</p>
      <p>So we turned our setup into yaven.</p>
    </EditorialSection>
    <EditorialSection title="Why agencies first"><p>Agencies have more clients than people, and their clients keep asking for more proactive thinking. They also hold sensitive client work under NDA, so we built yaven to keep it private from day one.</p></EditorialSection>
    <EditorialSection title="How we work"><p>Right now we work hands-on with each agency. We set yaven up around your clients and keep improving it with your team.</p></EditorialSection>
    <EditorialSection title="The team">
      <p><strong>Bettina (Betts) Sosa, co-founder and CEO.</strong> Design engineer and product builder. Betts has shipped products from zero as a founding engineer and led teams as Head of Engineering, across blockchain, zero-knowledge cryptography and developer tools. Her design work has been exhibited at the Design Museum in London and won Creative Conscience Gold and Silver. MEng in Design Engineering, Imperial College London.</p>
      <p><strong>Nick Price, co-founder and CTO.</strong> Engineer and researcher, trained at Imperial and MIT. Nick has published research in physics-informed modeling and put digital twins into production. Before yaven, he built AI agent infrastructure for a hedge fund.</p>
      <p>yaven is part of Betaworks.</p>
    </EditorialSection>
  </AgencyEditorial>
}
