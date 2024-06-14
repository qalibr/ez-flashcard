import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import DeckManager from "@/app/private/deck-manager";

export default async function PrivatePage() {
  const supabase = createClient()

  const {data, error} = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }


  // return <p>Hello {data.user.email}</p>

  return (
      <div>
        <div>
          <p>Hello {data.user.email}</p>
        </div>
        <DeckManager/>
      </div>
  )
}