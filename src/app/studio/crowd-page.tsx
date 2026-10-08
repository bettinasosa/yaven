import { CrowdHero } from "./crowd-hero"
import { CrowdHeroActions } from "./crowd-hero-actions"
import { CrowdCases } from "./crowd-cases"
import { CrowdKeyboard } from "./crowd-journey"
import { CrowdMemory } from "./crowd-memory"
import { CrowdStatement } from "./crowd-statement"
import { CrowdQuestions } from "./crowd-questions"
import { CrowdContact } from "./crowd-contact"
import { FlowChapter } from "./flow-chapter"
import { NameFooter } from "./flow-b/name-footer"
import styles from "./crowd-page.module.css"

/** The agency site, independent of the retired studio experiments. */
export function CrowdPage() {
  return <main className={styles.page}>
    <a href="#studio-content" className={styles.skip}>Skip to content</a>
    <CrowdHeroActions navigation persistent />
    <CrowdHero />
    <CrowdCases />
    <FlowChapter hold={.5}><CrowdKeyboard /></FlowChapter>
    <FlowChapter hold={.12}><CrowdMemory /></FlowChapter>
    <FlowChapter hold={.12}><CrowdStatement /></FlowChapter>
    <CrowdQuestions />
    <FlowChapter hold={.6}><CrowdContact /></FlowChapter>
    <NameFooter />
  </main>
}
