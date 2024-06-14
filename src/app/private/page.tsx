import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
    const supabase = createClient()

    /*
    * If someone attempts to enter this page and are not authenticated,
    * redirect to login page. */
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return <p>Hello {data.user.email}</p>
}