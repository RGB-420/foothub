import { Contact } from "../components/Contact"
import { HeroProfile } from "../components/HeroProfile"
import { Methodology } from "../components/Methodology"
import { ProfileSummary } from "../components/ProfileSummary"
import { Services } from "../components/Services"

export const HomePage = () => (
  <div className="home-page">
    <HeroProfile />
    <Services />
    <Methodology />
    <ProfileSummary />
    <Contact />
  </div>
)
