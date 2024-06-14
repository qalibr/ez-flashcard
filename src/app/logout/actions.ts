'use server' // This action runs on the server

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import { createClient } from '@/utils/supabase/server'

export async function logout() {
    const supabase = createClient();

    console.log("Attempted to logout");

    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}