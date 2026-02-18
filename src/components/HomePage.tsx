"use client";
import ContactForm from "@/components/ContactForm";
import ContactMenuButtonLeft from "@/components/ContactMenuButtonLeft";
import MenuButtonRight from "@/components/MenuButtonRight";
import MenuFooter from "@/components/MenuFooter";
import MenuGrid from "@/components/MenuGrid";
import { useState } from "react";
import MenuMuteButton from "./MenuMuteButton";

export default function HomePage({ page }: { page: any }) {
    const [showMenu, setShowMenu] = useState(true);

    const onEmailClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            {showMenu && (
                <>
                    <MenuGrid page={page} />
                    <MenuFooter page={page} />
                    <MenuMuteButton />
                </>
            )}
            {!showMenu && (
                <>
                    <ContactForm page={page} />
                    <ContactMenuButtonLeft />
                </>
            )}
            <MenuButtonRight onEmailClick={onEmailClick} rotated={!showMenu} />
        </>
    );
}
