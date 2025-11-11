import { FC, ReactNode } from "react";

export const BadgeCustom: FC<{text: string, bgColor: string}>= ({text, bgColor}) => {
    return (
        <span className="badge-custom p-1" style={{backgroundColor: bgColor}}>
            {text}
        </span>
    )
}
