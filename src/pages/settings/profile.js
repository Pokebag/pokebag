// Local imports
import { Layout } from 'components/Settings/Layout'
import { EmailForm } from 'components/Settings/EmailForm'
import { UsernameForm } from 'components/Settings/UsernameForm'





export default function AccountSettingsProfilePage() {
	return (
		<Layout>
			<UsernameForm />

			<EmailForm />
		</Layout>
	)
}
