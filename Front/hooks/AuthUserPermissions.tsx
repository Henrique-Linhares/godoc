"use client"

import { useAuth } from "@/context/Auth";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { ROUTES } from "@/routes/routes";

export const usePermissions = () => {

    const { logged } = useAuth()
    const router = useRouter()

    useEffect(() => {

        if (logged === false) {
            router.push(ROUTES.login)
        }

        return () => { console.log("Cleanup function") }
    }, [logged, router])


}