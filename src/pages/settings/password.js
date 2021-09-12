// Local imports
import { Layout } from 'components/Settings/Layout'
import { PasswordForm } from 'components/Settings/PasswordForm'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





export default function AccountSettingsPasswordPage() {
	useBreadcrumbs([
		{
			label: 'Account Settings',
			url: '/settings',
		},
		{
			label: 'Password',
			url: '/settings/password',
		},
	])

	return (
		<Layout
			description="Account Settings"
			title="Account Settings">
			<PasswordForm />
		</Layout>
	)
}
