// Local imports
import { Layout } from 'components/Settings/Layout'
import { EmailForm } from 'components/Settings/EmailForm'
import { UsernameForm } from 'components/Settings/UsernameForm'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





export default function AccountSettingsProfilePage() {
	useBreadcrumbs([
		{
			label: 'Account Settings',
			url: '/settings',
		},
		{
			label: 'Profile',
			url: '/settings/profile',
		},
	])

	return (
		<Layout>
			<UsernameForm />

			<EmailForm />
		</Layout>
	)
}
