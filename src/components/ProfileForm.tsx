import { usePortfolio } from '../context/PortfolioContext'
import { Input } from './ui/Input'

export const ProfileForm = () => {
  const { profile, updateProfile, updateSocialLink } = usePortfolio()

  return (
    <section aria-labelledby="profile-heading" className="space-y-4">
      <h2 id="profile-heading" className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
        Profile
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First Name"
          value={profile.firstName}
          onChange={(e) => updateProfile({ firstName: e.target.value })}
          placeholder="Jane"
          aria-label="First name"
        />
        <Input
          label="Last Name"
          value={profile.lastName}
          onChange={(e) => updateProfile({ lastName: e.target.value })}
          placeholder="Doe"
          aria-label="Last name"
        />
      </div>

      <Input
        label="Professional Title"
        value={profile.title}
        onChange={(e) => updateProfile({ title: e.target.value })}
        placeholder="Street Photographer"
        aria-label="Professional title"
      />

      <div className="space-y-3 pt-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Social Links</p>
        <Input
          label="Instagram"
          value={profile.socialLinks.instagram}
          onChange={(e) => updateSocialLink('instagram', e.target.value)}
          placeholder="https://instagram.com/username"
          aria-label="Instagram URL"
        />
        <Input
          label="LinkedIn"
          value={profile.socialLinks.linkedin}
          onChange={(e) => updateSocialLink('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/username"
          aria-label="LinkedIn URL"
        />
        <Input
          label="Twitter / X"
          value={profile.socialLinks.twitter}
          onChange={(e) => updateSocialLink('twitter', e.target.value)}
          placeholder="https://x.com/username"
          aria-label="Twitter URL"
        />
        <Input
          label="Website"
          value={profile.socialLinks.website}
          onChange={(e) => updateSocialLink('website', e.target.value)}
          placeholder="https://yourwebsite.com"
          aria-label="Website URL"
        />
      </div>
    </section>
  )
}
